import { Cron } from "recron";
import { notifyOnMissingDays } from "./functions";
import { logger } from "./logger";

export const cron = new Cron();

cron.schedule("0 12 * * *", async () => {
  logger.info(
    "Checking for notifications to send for missing tracking entries"
  );

  await notifyOnMissingDays();
});

// every 10s
cron.schedule("*/10 * * * * *", async () => {
  logger.info("Heartbeat");
});
