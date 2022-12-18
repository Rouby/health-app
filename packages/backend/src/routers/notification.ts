import { z } from "zod";
import { prisma } from "../prisma";
import { protectedProcedure, router } from "../trpc";

export const notificationRouter = router({
  register: protectedProcedure
    .input(
      z.object({
        endpoint: z.string(),
        keys: z.any(),
      })
    )
    .mutation(async (req) => {
      await prisma.pushNotification.create({
        data: {
          user: { connect: { id: req.ctx.user.id } },
          endpoint: req.input.endpoint,
          keys: req.input.keys,
        },
      });
    }),
});
