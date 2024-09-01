import { ForbiddenError, subject } from "@casl/ability";
import dayjs from "dayjs";
import { z } from "zod";
import { DayWithoutSex } from "../data/daysWithoutSex";
import { SexAct } from "../data/sexActs";
import { protectedProcedure, router } from "../trpc";

export const trackerRouter = router({
  sexActs: protectedProcedure.input(z.object({})).query(async (req) => {
    return (
      await SexAct.filter((act) => req.ctx.ability.can("read", act))
    ).sort((a, b) => dayjs(a.dateTime).diff(dayjs(b.dateTime)));
  }),

  daysWithoutSex: protectedProcedure.input(z.object({})).query(async (req) => {
    return (
      await DayWithoutSex.filter((d) => req.ctx.ability.can("read", d))
    ).sort((a, b) => dayjs(a.dateTime).diff(dayjs(b.dateTime)));
  }),

  sexStats: protectedProcedure.query(async (req) => {
    const firstDayOfWeek = req.ctx.user.firstDayOfWeek;

    const sexActs = (
      await SexAct.filter((act) => req.ctx.ability.can("read", act))
    ).sort((a, b) => dayjs(a.dateTime).diff(dayjs(b.dateTime)));

    const daysWithoutSex = (
      await DayWithoutSex.filter((d) => req.ctx.ability.can("read", d))
    ).sort((a, b) => dayjs(a.dateTime).diff(dayjs(b.dateTime)));

    const mostConsecutiveDaysWithoutSex = daysWithoutSex.reduce(
      (acc, day) => {
        if (acc.currentStreak === 0) {
          acc.currentStreak = 1;
          acc.longestStreak = 1;
          acc.lastDay = new Date(day.dateTime);
        } else {
          const lastDay = dayjs(acc.lastDay);
          const currentDay = dayjs(day.dateTime);

          if (lastDay.add(1, "day").isSame(currentDay, "day")) {
            acc.currentStreak += 1;
            acc.longestStreak = Math.max(acc.longestStreak, acc.currentStreak);
          } else {
            acc.currentStreak = 1;
          }

          acc.lastDay = new Date(day.dateTime);
        }

        return acc;
      },
      {
        currentStreak: 0,
        longestStreak: 0,
        lastDay: undefined as undefined | Date,
      }
    ).longestStreak;

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
      mostConsecutiveDaysWithoutSex,
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
        duration: z.string().regex(
          // ISO Duration regex
          /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/
        ),
        location: z.string(),
        initiator: z.enum(["USER", "PARTNER"]),
        foreplayOnUser: z.string(),
        foreplayOnPartner: z.string(),
        position: z.string(),
        userFinished: z.boolean(),
        partnerFinished: z.boolean(),
      })
    )
    .mutation(async (req) => {
      ForbiddenError.from(req.ctx.ability).throwUnlessCan("create", "SexAct");

      const sexAct = new SexAct({
        ...req.input,
        userId: req.ctx.user.id,
      });

      await sexAct.save();

      return sexAct.toJSON();
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

      const dayWithoutSex = new DayWithoutSex({
        ...req.input,
        userId: req.ctx.user.id,
      });

      await dayWithoutSex.save();

      return dayWithoutSex.toJSON();
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        dateTime: z.string().datetime(),
        duration: z.string().regex(
          // ISO Duration regex
          /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/
        ),
        location: z.string(),
        initiator: z.enum(["USER", "PARTNER"]),
        foreplayOnUser: z.string(),
        foreplayOnPartner: z.string(),
        position: z.string(),
        userFinished: z.boolean(),
        partnerFinished: z.boolean(),
      })
    )
    .mutation(async (req) => {
      const act = await SexAct.findById(req.input.id);

      if (!act) {
        throw new Error("Act not found.");
      }

      ForbiddenError.from(req.ctx.ability).throwUnlessCan(
        "update",
        subject("SexAct", act)
      );

      const { id, ...data } = req.input;

      Object.entries(data).forEach(([key, value]) => {
        (act as any)[key] = value;
      });

      return act.toJSON();
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
