/// <reference lib="webworker" />

import * as webpush from "web-push";
import { MessageDescriptor } from "./i18n";
import { logger } from "./logger";
import { prisma } from "./prisma";

export async function sendNotification(
  subscription: {
    endpoint: string;
    keys: { p256dh: string; auth: string };
  },
  subject: string,
  payload?: { title: MessageDescriptor; data: NotificationOptions }
) {
  try {
    await webpush.sendNotification(
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
  } catch (error) {
    if (error instanceof webpush.WebPushError) {
      if (error.statusCode === 410) {
        await prisma.pushNotification.delete({
          where: {
            endpoint: subscription.endpoint,
          },
        });

        logger.info(subscription, "Deleted stale subscription");
      }
    }
  }
}
