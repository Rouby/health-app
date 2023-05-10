import nrPino from "@newrelic/pino-enricher";
import pino from "pino";

export const logger = pino(nrPino());
logger.level = "info";
