import * as newrelic from "newrelic";

import { initTRPC } from "@trpc/server";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import minMax from "dayjs/plugin/minMax";
import fastify from "fastify";
import { createContext } from "./context";
import { cron } from "./cron";
import { logger } from "./logger";
import {
  accountRouter,
  authRouter,
  notificationRouter,
  trackerRouter,
} from "./routers";
import { unleash } from "./unleash";

dayjs.extend(duration);
dayjs.extend(minMax);

const t = initTRPC.create();

const appRouter = t.router({
  auth: authRouter,
  account: accountRouter,
  tracker: trackerRouter,
  notification: notificationRouter,
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

(async () => {
  await unleash
    .start()
    .then(() => logger.info("Unleash started"))
    .catch((err) => logger.error(err));
  await cron
    .start()
    .then(() => logger.info("Cron started"))
    .catch((err) => logger.error(err));
  await server.listen({ port: +(process.env.PORT || 5000) });
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
