import { accessibleBy } from "@casl/prisma";
import dayjs from "dayjs";
import { Cron } from "recron";
import { createAbility } from "./ability";
import { defineMessage } from "./i18n";
import { logger } from "./logger";
import { prisma } from "./prisma";
import { sendNotification } from "./webPush";

export const cron = new Cron();

cron.schedule("0 12 * * *", async () => {
  logger.info(
    "Checking for notifications to send for missing tracking entries"
  );

  const usersWithNotifications = await prisma.user.findMany({
    where: { pushNotifications: { some: { endpoint: { not: "" } } } },
    include: { pushNotifications: true },
  });

  usersWithNotifications.map(async (user) => {
    const ability = await createAbility(user);

    const sexActs = await prisma.sexAct.findMany({
      where: accessibleBy(ability).SexAct,
      orderBy: { dateTime: "asc" },
    });
    const daysWithoutSex = await prisma.dayWithoutSex.findMany({
      where: accessibleBy(ability).DayWithoutSex,
      orderBy: { dateTime: "asc" },
    });

    const firstTrackedDay = dayjs
      .min(
        dayjs(sexActs?.at(0)?.dateTime),
        dayjs(daysWithoutSex?.at(0)?.dateTime)
      )
      .startOf("day");
    const days = Array.from(
      {
        length: Math.ceil(
          dayjs().endOf("day").diff(firstTrackedDay, "day", true)
        ),
      },
      (_, idx) => firstTrackedDay.add(idx, "day")
    );
    const daysWithoutTracking = days.filter(
      (day) =>
        ![...(sexActs ?? []), ...(daysWithoutSex ?? [])].some((act) =>
          day.isSame(act.dateTime, "day")
        )
    );

    if (daysWithoutTracking.length > 0) {
      user.pushNotifications.forEach((notification) => {
        if (isPushKeys(notification.keys)) {
          sendNotification(
            { endpoint: notification.endpoint, keys: notification.keys },
            "https://sexy.aiacta.com",
            {
              title: defineMessage({
                defaultMessage: "You have untracked days",
              }),
              data: {
                icon: "/icon-192x192.png",
                badge: "/badges/heart.png",
              },
            }
          );
        }
      });
    }
  });
});

function isPushKeys(keys: unknown): keys is { auth: string; p256dh: string } {
  return (
    typeof keys === "object" && !!keys && "auth" in keys && "p256dh" in keys
  );
}
