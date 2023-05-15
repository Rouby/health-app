import { compare, hash } from "bcryptjs";
import { z } from "zod";
import { signToken } from "../auth";
import { prisma } from "../prisma";
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
      const userWithPassword = await prisma.user.findUnique({
        where: { email: req.input.email },
        include: {
          password: true,
        },
      });

      if (!userWithPassword?.password) {
        throw new Error("Invalid login");
      }

      const isValid = await compare(
        req.input.password,
        userWithPassword.password.hash
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

      const user = await prisma.user.create({
        data: {
          name: req.input.name,
          email: req.input.email,
          password: {
            create: {
              hash: hashedPassword,
            },
          },
        },
      });

      return signToken(user);
    }),

  validate: protectedProcedure.mutation(async (req) => {
    return true;
  }),
});
