import { compare, hash } from "bcryptjs";
import { z } from "zod";
import { signToken } from "../auth";
import { User } from "../data/users";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const authRouter = router({
  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (req) => {
      const userWithPassword = await User.findByEmail(req.input.email);

      if (!userWithPassword?.password) {
        throw new Error("Invalid login");
      }

      const isValid = await compare(
        req.input.password,
        userWithPassword.password
      );

      if (!isValid) {
        throw new Error("Invalid login");
      }

      return signToken(userWithPassword);
    }),

  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
        name: z.string().min(3),
      })
    )
    .mutation(async (req) => {
      const hashedPassword = await hash(req.input.password, 10);

      const user = new User({
        email: req.input.email,
        name: req.input.name,
        password: hashedPassword,
      });

      await user.save();

      return signToken(user);
    }),

  validate: protectedProcedure.mutation(async (req) => {
    return true;
  }),
});
