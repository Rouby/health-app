import { accessibleBy } from "@casl/prisma";
import dayjs from "dayjs";
import { createAbility } from "../ability";
import { signToken } from "../auth";
import { defineMessage } from "../i18n";
import { logger } from "../logger";
import { prisma } from "../prisma";
import { unleash } from "../unleash";
import { sendNotification } from "../webPush";

export async function notifyOnMissingDays() {
  const usersWithNotifications = await prisma.user.findMany({
    where: { pushNotifications: { some: { endpoint: { not: "" } } } },
    include: { pushNotifications: true },
  });

  await Promise.allSettled(
    usersWithNotifications.map(async (user) => {
      const ability = await createAbility(user);

      await unleash.updateContext({
        userId: user.id,
        userEmail: user.email,
      } as any);

      if (!unleash.isEnabled("Tracking")) {
        logger.debug(
          {
            user: {
              id: user.id,
              email: user.email,
              toggles: unleash.getAllToggles(),
            },
            unleash: unleash.getContext(),
          },
          'Feature "Tracking" is disabled - Not sending message'
        );
        return;
      }

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
          ) && !day.isSame(dayjs(), "day")
      );

      if (daysWithoutTracking.length > 0) {
        user.pushNotifications.forEach((notification) => {
          daysWithoutTracking.forEach((day) => {
            if (isPushKeys(notification.keys)) {
              sendNotification(
                { endpoint: notification.endpoint, keys: notification.keys },
                "https://sexy.aiacta.com",
                {
                  title: defineMessage({
                    defaultMessage:
                      "You have an untracked day: {day, date, medium}",
                    values: { day: day.toISOString() },
                  }),
                  data: {
                    icon: "/icon-192x192.png",
                    badge: "/badges/heart.png",
                    actions: [
                      {
                        title: defineMessage({
                          defaultMessage: "Track no sex",
                        }),
                        action: JSON.stringify({
                          type: "trackNoSex",
                          auth: signToken(user),
                          dateTime: day.toISOString(),
                        }),
                      },
                    ],
                    tag: `tracker:noSex:${day.toISOString()}`,
                  },
                }
              );
            }
          });
        });
      }
    })
  );
}

function isPushKeys(keys: unknown): keys is { auth: string; p256dh: string } {
  return (
    typeof keys === "object" && !!keys && "auth" in keys && "p256dh" in keys
  );
}
