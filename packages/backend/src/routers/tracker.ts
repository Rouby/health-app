import { ForbiddenError, subject } from "@casl/ability";
import { accessibleBy } from "@casl/prisma";
import dayjs from "dayjs";
import { z } from "zod";
import { prisma } from "../prisma";
import { protectedProcedure, router } from "../trpc";

export const trackerRouter = router({
  sexActs: protectedProcedure.input(z.object({})).query(async (req) => {
    return prisma.sexAct.findMany({
      where: accessibleBy(req.ctx.ability).SexAct,
      orderBy: { dateTime: "asc" },
    });
  }),

  daysWithoutSex: protectedProcedure.input(z.object({})).query(async (req) => {
    return prisma.dayWithoutSex.findMany({
      where: accessibleBy(req.ctx.ability).DayWithoutSex,
      orderBy: { dateTime: "asc" },
    });
  }),

  sexStats: protectedProcedure.query(async (req) => {
    const firstDayOfWeek = req.ctx.user.firstDayOfWeek;

    const sexActs = await prisma.sexAct.findMany({
      where: accessibleBy(req.ctx.ability).SexAct,
      orderBy: { dateTime: "asc" },
    });

    // group sexActs by week
    const groupedByWeek = sexActs.reduce((acc, act) => {
      const week = dayjs(act.dateTime)
        .startOf("week")
        .add(firstDayOfWeek, "days")
        .toISOString();

      if (!acc.has(week)) {
        acc.set(week, []);
      }

      acc.get(week)?.push(act);

      return acc;
    }, new Map<string, typeof sexActs>());

    if (sexActs.length > 0) {
      // fill in missing weeks
      const firstWeek = dayjs(sexActs.at(0)!.dateTime)
        .startOf("week")
        .add(firstDayOfWeek, "days");
      const lastWeek = dayjs()
        .startOf("week")
        .add(firstDayOfWeek, "days")
        .add(1, "week");

      let currentWeek = firstWeek;
      while (currentWeek.isBefore(lastWeek)) {
        if (!groupedByWeek.has(currentWeek.toISOString())) {
          groupedByWeek.set(currentWeek.toISOString(), []);
        }
        currentWeek = currentWeek.add(1, "week");
      }
    }

    const weeklyStats = Array.from(groupedByWeek.entries())
      .map(([week, acts]) => {
        return {
          week: dayjs(week).toDate(),
          averageDuration: calculateAverageDuration(acts),
          totalActs: acts.length,
        };
      })
      .sort((a, b) => {
        return dayjs(a.week).isBefore(b.week) ? -1 : 1;
      });

    return {
      weeklyStats,
      totalActs: sexActs.length,
      averageDuration: calculateAverageDuration(sexActs),
      averageActsPerWeek:
        weeklyStats.reduce((acc, stat) => {
          return acc + stat.totalActs;
        }, 0) / weeklyStats.length,
    };
  }),

  add: protectedProcedure
    .input(
      z.object({
        dateTime: z.string().datetime(),
        duration: z
          .string()
          .regex(
            // ISO Duration regex
            /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/
          )
          .nullish(),
        location: z.string().nullish(),
        initiator: z.enum(["USER", "PARTNER"]),
        foreplayOnUser: z.string().nullish(),
        foreplayOnPartner: z.string().nullish(),
        position: z.string(),
        userFinished: z.boolean(),
        partnerFinished: z.boolean(),
      })
    )
    .mutation(async (req) => {
      ForbiddenError.from(req.ctx.ability).throwUnlessCan("create", "SexAct");

      return prisma.sexAct.create({
        data: { ...req.input, user: { connect: { id: req.ctx.user.id } } },
      });
    }),

  addDayWithoutSex: protectedProcedure
    .input(
      z.object({
        dateTime: z.string().datetime(),
        onPeriod: z.boolean(),
      })
    )
    .mutation(async (req) => {
      ForbiddenError.from(req.ctx.ability).throwUnlessCan(
        "create",
        "DayWithoutSex"
      );

      return prisma.dayWithoutSex.create({
        data: {
          dateTime: dayjs(req.input.dateTime).startOf("day").toDate(),
          onPeriod: req.input.onPeriod,
          user: { connect: { id: req.ctx.user.id } },
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        dateTime: z.string().datetime(),
        duration: z
          .string()
          .regex(
            // ISO Duration regex
            /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/
          )
          .nullish(),
        location: z.string().nullish(),
        initiator: z.enum(["USER", "PARTNER"]),
        foreplayOnUser: z.string().nullish(),
        foreplayOnPartner: z.string().nullish(),
        position: z.string(),
        userFinished: z.boolean(),
        partnerFinished: z.boolean(),
      })
    )
    .mutation(async (req) => {
      const act = await prisma.sexAct.findUnique({
        where: { id: req.input.id },
      });

      if (!act) {
        throw new Error("Act not found.");
      }

      ForbiddenError.from(req.ctx.ability).throwUnlessCan(
        "update",
        subject("SexAct", act)
      );

      const { id, ...data } = req.input;

      return prisma.sexAct.update({
        where: { id },
        data,
      });
    }),
});

function calculateAverageDuration(acts: { duration?: string | null }[]) {
  const actsWithDuration = acts.filter(
    (act): act is { duration: string } => !!act.duration
  );
  const totalDuration = actsWithDuration.reduce(
    (acc, act) => acc + dayjs.duration(act.duration).asMinutes(),
    0
  );
  return dayjs
    .duration(Math.round(totalDuration / actsWithDuration.length), "minutes")
    .toISOString();
}
