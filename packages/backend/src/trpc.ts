import { initTRPC, TRPCError } from "@trpc/server";
import * as newrelic from "newrelic";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create();

export const middleware = t.middleware;

export const isAuthed = middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const withSegment = middleware(({ next, ctx, path }) => {
  return newrelic.startSegment(path, true, next);
});

export const router = t.router;
export const publicProcedure = t.procedure.use(withSegment);
export const protectedProcedure = t.procedure.use(withSegment).use(isAuthed);
