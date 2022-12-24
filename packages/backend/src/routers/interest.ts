import { z } from "zod";
import { tags } from "../data/tags";
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
          tags: { some: { translationKey: tags.practice.translationKey } },
        },
        include: { tags: true },
      }));

    const count = await prisma.sexInterest.count({
      where: {
        userIntents: {
          none: { userId: req.ctx.user.id },
        },
        tags: { some: { translationKey: tags.practice.translationKey } },
      },
    });

    return (
      interestFromPartner ||
      (await prisma.sexInterest.findFirst({
        where: {
          userIntents: {
            none: { userId: req.ctx.user.id },
          },
          tags: { some: { translationKey: tags.practice.translationKey } },
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

  positions: protectedProcedure.query(async (req) => {
    return await prisma.sexInterest.findMany({
      where: {
        tags: { some: { translationKey: tags.position.translationKey } },
      },
      include: {
        tags: true,
        userIntents: { where: { userId: req.ctx.user.id } },
      },
    });
  }),
});
