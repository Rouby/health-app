import * as newrelic from "newrelic";

import { syncCache } from "@rouby/sheetdb";
import { initTRPC } from "@trpc/server";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import minMax from "dayjs/plugin/minMax";
import fastify from "fastify";
import { createContext } from "./context";
import { cron } from "./cron";
import { SexAct } from "./data/sexActs";
import { logger } from "./logger";
import { prisma } from "./prisma";
import {
  accountRouter,
  authRouter,
  interestRouter,
  moodRouter,
  notificationRouter,
  trackerRouter,
} from "./routers";
import { upsertInterests } from "./seed";
import { unleash } from "./unleash";

dayjs.extend(duration);
dayjs.extend(minMax);

const t = initTRPC.create();

const appRouter = t.router({
  auth: authRouter,
  account: accountRouter,
  tracker: trackerRouter,
  mood: moodRouter,
  notification: notificationRouter,
  interest: interestRouter,
});

const server = fastify({
  maxParamLength: 5000,
  logger,
  disableRequestLogging: true,
});
server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter, createContext },
});
server.addHook("onRequest", (request, reply, next) => {
  newrelic.setTransactionName(`${request.method} ${request.url}`);
  next();
});

upsertInterests().then(async () => {
  await unleash.start().then(() => logger.info("Unleash started"));
  await cron.start().then(() => logger.info("Cron started"));
  await server.listen({ port: +(process.env.PORT || 5000) });
});

(async () => {
  logger.info("Syncing database to sheets");

  await prisma.sexAct.findMany().then(async (sexActs) => {
    for (const sexAct of sexActs) {
      const existing = await SexAct.findById(sexAct.id);
      if (!existing) {
        await new SexAct({
          id: sexAct.id,
          userId: sexAct.userId,
          dateTime: sexAct.dateTime.toISOString(),
          duration: sexAct.duration ?? "",
          location: sexAct.location ?? "",
          initiator: sexAct.initiator,
          foreplayOnUser: sexAct.foreplayOnUser ?? "",
          foreplayOnPartner: sexAct.foreplayOnPartner ?? "",
          position: sexAct.position,
          userFinished: sexAct.userFinished,
          partnerFinished: sexAct.partnerFinished,
        }).save();
      }
    }
  });

  await syncCache();
})();

process.once("SIGINT", gracefulShutdown);
process.once("SIGTERM", gracefulShutdown);

function gracefulShutdown(signal: any) {
  Promise.all([server.close()]).finally(() => {
    process.kill(process.pid, signal);
  });
}

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
