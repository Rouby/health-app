import { initTRPC } from "@trpc/server";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import fastify from "fastify";
import { createContext } from "./context";
import { accountRouter, authRouter, trackerRouter } from "./routers";

dayjs.extend(duration);

const t = initTRPC.create();

const appRouter = t.router({
  auth: authRouter,
  account: accountRouter,
  tracker: trackerRouter,
});

const server = fastify({
  maxParamLength: 5000,
});
server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter, createContext },
});

server
  .listen({ port: +(process.env.PORT || 5000) })
  .then(() =>
    console.log(`Server listening on port ${process.env.PORT || 5000}`)
  );

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
