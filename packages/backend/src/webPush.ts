import * as webpush from "web-push";
import { prisma } from "./prisma";

export async function sendNotification(
  subscription: {
    endpoint: string;
    keys: { p256dh: string; auth: string };
  },
  subject: string,
  payload: {}
) {
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

  if (result.statusCode === 410) {
    await prisma.pushNotification.delete({
      where: {
        endpoint: subscription.endpoint,
      },
    });

    throw new Error("Subscription has expired or is no longer valid.");
  }
}
