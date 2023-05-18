import nrPino from "@newrelic/pino-enricher";
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
