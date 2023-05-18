import { PrismaClient } from "@prisma/client";
import * as newrelic from "newrelic";

export const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  return newrelic.startSegment(`${params.model}.${params.action}`, true, () => {
    Object.entries(params.args).forEach(([key, value]) => {
      switch (typeof value) {
        case "string":
        case "number":
        case "boolean":
          newrelic.addCustomSpanAttribute(`db.${key}`, value);
          return;
        case "undefined":
          return;
        default:
          newrelic.addCustomSpanAttribute(`db.${key}`, JSON.stringify(value));
          return;
      }
    });
    return next(params);
  });
});
