import { z } from "zod";
import { prisma } from "../prisma";
import { protectedProcedure, router } from "../trpc";
7;
export const interestRouter = router({
  newInterest: protectedProcedure.mutation(async (req) => {
    const interestFromPartner =
      req.ctx.user.partnerId &&
      (await prisma.sexInterest.findFirst({
        where: {
          userIntents: {
            none: { userId: req.ctx.user.id },
            some: { userId: req.ctx.user.partnerId },
          },
        },
        include: { tags: true },
      }));

    const count = await prisma.sexInterest.count({
      where: {
        userIntents: {
          none: { userId: req.ctx.user.id },
        },
      },
    });

    return (
      interestFromPartner ||
      (await prisma.sexInterest.findFirst({
        where: {
          userIntents: {
            none: { userId: req.ctx.user.id },
          },
        },
        skip: Math.floor(Math.random() * count),
        include: { tags: true },
      }))
    );
  }),

  setInterest: protectedProcedure
    .input(z.object({ interestId: z.string(), interested: z.boolean() }))
    .mutation(async (req) => {
      return await prisma.sexInterestUserIntent.upsert({
        where: {
          userId_sexInterestId: {
            userId: req.ctx.user.id,
            sexInterestId: req.input.interestId,
          },
        },
        create: {
          user: { connect: { id: req.ctx.user.id } },
          sexInterest: { connect: { id: req.input.interestId } },
          interested: req.input.interested,
        },
        update: {
          interested: req.input.interested,
        },
      });
    }),

  unsetInterest: protectedProcedure.input(z.string()).mutation(async (req) => {
    return await prisma.sexInterestUserIntent.delete({
      where: {
        userId_sexInterestId: {
          userId: req.ctx.user.id,
          sexInterestId: req.input,
        },
      },
    });
  }),
});
