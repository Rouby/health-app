import nrPino from "@newrelic/pino-enricher";
import { setLogger } from "@rouby/sheetdb";
import newrelic from "newrelic";
import pino from "pino";

export const logger = pino(nrPino(), {
  write(msg) {
    const json = JSON.parse(msg);

    newrelic.recordLogEvent({
      ...json,
      level: (
        {
          10: "trace",
          20: "debug",
          30: "info",
          40: "warn",
          50: "error",
          60: "fatal",
        } as any
      )[json.level],
    });
    console.log(msg);
  },
});
logger.level = process.env.LOG_LEVEL || "info";

setLogger({
  debug: logger.debug.bind(logger),
  info: logger.info.bind(logger),
  warn: logger.warn.bind(logger),
  error: logger.error.bind(logger),
  log: logger.info.bind(logger),
  trace: logger.trace.bind(logger),
});
