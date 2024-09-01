import { ForbiddenError, subject } from "@casl/ability";
import { z } from "zod";
import { User } from "../data/users";
import { protectedProcedure, router } from "../trpc";

export const accountRouter = router({
  get: protectedProcedure.input(z.string().nullish()).query(async (req) => {
    const user = await User.findById(req.input ?? req.ctx.user.id);

    if (!user) {
      return null;
    }

    ForbiddenError.from(req.ctx.ability).throwUnlessCan(
      "read",
      subject("User", user)
    );

    return user.toJSON();
  }),

  findPartner: protectedProcedure
    .input(
      z.object({
        name: z.string().nullish(),
      })
    )
    .query(async (req) => {
      const users = await User.filter((u) => {
        if (req.input.name && !u.name.includes(req.input.name)) {
          return false;
        }

        if (u.partnerId) {
          return false;
        }

        if (u.id === req.ctx.user.id) {
          return false;
        }

        return true;
      });

      return users.map((user) => user.toJSON());
    }),

  update: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3).nullish(),
        partnerId: z.string().nullish(),
      })
    )
    .mutation(async (req) => {
      if (req.input.partnerId) {
        const partner = await User.findById(req.input.partnerId);

        if (partner?.partnerId && partner?.partnerId !== req.ctx.user.id) {
          throw new Error("User already has a partner");
        }
      }

      if (req.input.name) {
        req.ctx.user.name = req.input.name;
      }
      if ("partnerId" in req.input) {
        req.ctx.user.partnerId = req.input.partnerId ?? "";
      }

      await req.ctx.user.save();

      return req.ctx.user.toJSON();
    }),
});
