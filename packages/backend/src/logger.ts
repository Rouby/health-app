import nrPino from "@newrelic/pino-enricher";
import newrelic from "newrelic";
import pino from "pino";

newrelic.instrumentLoadedModule("pino", pino);

export const logger = pino(nrPino());
logger.level = process.env.LOG_LEVEL || "info";
