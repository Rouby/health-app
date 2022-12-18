import dayjs from "dayjs";
import { z } from "zod";
import { prisma } from "../prisma";
import { protectedProcedure, router } from "../trpc";

export const moodRouter = router({
  get: protectedProcedure.query(async (req) => {
    const mood = await prisma.mood.findUnique({
      where: { userId: req.ctx.user.id },
    });
    const partnerMood = req.ctx.user.partnerId
      ? await prisma.mood.findUnique({
          where: { userId: req.ctx.user.partnerId },
        })
      : null;

    return {
      mood,
      match:
        mood && partnerMood
          ? dayjs
              .min(
                mood.validUntil
                  ? dayjs(mood.validUntil)
                  : dayjs().add(1, "day"),
                partnerMood.validUntil
                  ? dayjs(mood.validUntil)
                  : dayjs().add(1, "day")
              )
              .isAfter(dayjs())
          : false,
    };
  }),
  set: protectedProcedure
    .input(z.object({ inMood: z.boolean() }))
    .mutation(async (req) => {
      if (req.input.inMood) {
        await prisma.mood.create({
          data: { user: { connect: { id: req.ctx.user.id } } },
        });
      } else {
        await prisma.mood.delete({
          where: { userId: req.ctx.user.id },
        });
      }
    }),
});
