import { z } from "zod";
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
      req.ctx.user.pushNotifications.push({
        endpoint: req.input.endpoint,
        keys: req.input.keys,
      });

      await req.ctx.user.save();
    }),
});
