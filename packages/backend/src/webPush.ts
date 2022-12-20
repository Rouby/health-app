/// <reference lib="webworker" />

import * as newrelic from "newrelic";
import * as webpush from "web-push";
import { MessageDescriptor } from "./i18n";
import { logger } from "./logger";
import { prisma } from "./prisma";

export const sendNotification = (
  subscription: {
    endpoint: string;
    keys: { p256dh: string; auth: string };
  },
  subject: string,
  payload?: { title: MessageDescriptor; data: NotificationOptions }
) =>
  newrelic.startBackgroundTransaction(
    "sendNotification",
    sendNotification_(subscription, subject, payload)
  );

async function sendNotification_(
  subscription: {
    endpoint: string;
    keys: { p256dh: string; auth: string };
  },
  subject: string,
  payload?: { title: MessageDescriptor; data: NotificationOptions }
) {
  try {
    const result = await webpush.sendNotification(
      {
        endpoint: subscription.endpoint,
        keys: subscription.keys,
      },
      JSON.stringify(payload),
      {
        gcmAPIKey: process.env.GCM_KEY,
        vapidDetails: {
          publicKey: process.env.VAPID_PUBLIC_KEY!,
          privateKey: process.env.VAPID_PRIVATE_KEY!,
          subject,
        },
      }
    );
    logger.info(result, "Sent push notification");
  } catch (error) {
    if (error instanceof webpush.WebPushError && error.statusCode === 410) {
      await prisma.pushNotification.delete({
        where: {
          endpoint: subscription.endpoint,
        },
      });

      logger.info(subscription, "Deleted stale subscription");
    } else {
      logger.error(error);
    }
  }
}
