import dayjs from "dayjs";
import { z } from "zod";
import { defineMessage } from "../i18n";
import { prisma } from "../prisma";
import { protectedProcedure, router } from "../trpc";
import { sendNotification } from "../webPush";

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

        if (req.ctx.user.partnerId) {
          const partnerInMood = !!(await prisma.mood.findFirst({
            where: { userId: req.ctx.user.partnerId },
          }));

          if (partnerInMood) {
            const notifications = await prisma.pushNotification.findMany({
              where: {
                OR: [
                  // { userId: req.ctx.user.id },
                  { userId: req.ctx.user.partnerId },
                ],
              },
            });

            notifications.forEach((notification) => {
              sendNotification(notification as any, "https://sexy.aiacta.com", {
                title: defineMessage({
                  defaultMessage: "Your partner is in the mood",
                }),
                data: {
                  icon: "/icon-192x192.png",
                  badge: "/badges/heart.png",
                },
              });
            });
          }
        }
      } else {
        await prisma.mood.delete({
          where: { userId: req.ctx.user.id },
        });
      }
    }),
});
