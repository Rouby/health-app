import { ForbiddenError, subject } from "@casl/ability";
import { z } from "zod";
import { prisma } from "../prisma";
import { protectedProcedure, router } from "../trpc";

export const accountRouter = router({
  get: protectedProcedure.input(z.string().nullish()).query(async (req) => {
    const user = await prisma.user.findUnique({
      where: {
        id: req.input ?? req.ctx.user.id,
      },
      include: {
        partner: {
          select: {
            id: true,
            name: true,
          },
        },
        partnerProposer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    ForbiddenError.from(req.ctx.ability).throwUnlessCan(
      "read",
      subject("User", user)
    );

    return user;
  }),

  findPartner: protectedProcedure
    .input(
      z.object({
        name: z.string().nullish(),
      })
    )
    .query(async (req) => {
      const users = await prisma.user.findMany({
        where: {
          ...(req.input.name && {
            name: {
              contains: req.input.name,
            },
          }),
          partnerId: null,
          id: { not: req.ctx.user.id },
        },
        take: 10,
        select: {
          id: true,
          name: true,
        },
      });

      return users;
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
        const partner = await prisma.user.findUnique({
          where: { id: req.input.partnerId },
        });

        if (partner?.partnerId && partner?.partnerId !== req.ctx.user.id) {
          throw new Error("User already has a partner");
        }
      }

      return await prisma.user.update({
        where: { id: req.ctx.user.id },
        data: {
          ...(req.input.name && {
            name: req.input.name,
          }),
          ...(req.input.partnerId && {
            partner: { connect: { id: req.input.partnerId } },
          }),
          ...(req.input.partnerId === null && {
            partner: { disconnect: true },
          }),
        },
        include: {
          partner: {
            select: {
              id: true,
              name: true,
            },
          },
          partnerProposer: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    }),
});
