import pino from "pino";

export const logger = pino();
logger.level =
  (typeof localStorage !== "undefined" && localStorage.getItem("LOG_LEVEL")) ||
  "debug";
