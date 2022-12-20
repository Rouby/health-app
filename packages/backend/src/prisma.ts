import { PrismaClient } from "@prisma/client";
import * as newrelic from "newrelic";

export const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  return newrelic.startSegment(`${params.model}.${params.action}`, true, () => {
    newrelic.addCustomSpanAttribute("db.args", params.args);
    return next(params);
  });
});
