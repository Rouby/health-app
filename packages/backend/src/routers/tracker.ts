import { ForbiddenError } from "@casl/ability";
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
});
