/// <reference lib="esNext" />
/// <reference lib="webworker" />

import type { AppRouter } from "@rouby/sex-app-backend/src/main";
import type { NotificationPayload } from "@rouby/sex-app-backend/src/webPush";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { logger } from "./logger";

const sw: ServiceWorkerGlobalScope = self as any;

sw.addEventListener("pushsubscriptionchange", (event: any) => {
  logger.debug("[Service Worker]: 'pushsubscriptionchange' event fired.");

  const subscription = sw.registration.pushManager
    .subscribe(event.oldSubscription.options)
    .then((subscription) =>
      getClient().notification.register.mutate({
        endpoint: subscription.endpoint,
        keys: subscription.toJSON().keys,
      })
    );

  event.waitUntil(subscription);
});

sw.addEventListener("push", (event) => {
  if (event.data) {
    try {
      const {
        title,
        data: { actions, ...options },
      } = event.data.json() as NotificationPayload;

      const translatedActions = Promise.all(
        (actions ?? []).map(async ({ title, ...action }) => ({
          ...action,
          title: await translateDescriptor(title),
        }))
      );

      event.waitUntil(
        Promise.all([translateDescriptor(title), translatedActions]).then(
          ([translation, actions]) => {
            logger.debug(
              "[Service Worker]: Showing notification with title '%s' and actions %o.",
              translation,
              actions
            );
            sw.registration.showNotification(translation, {
              ...options,
              actions: actions,
            });
          }
        )
      );
    } catch (err) {
      logger.error(
        "[Service Worker]: malformed push data '%s'.",
        event.data.text()
      );
    }
  }
});

sw.addEventListener("notificationclick", (event) => {
  const clickedNotification = event.notification;
  clickedNotification.close();

  if (event.action) {
    const { type, ...params } = JSON.parse(event.action);

    if (type === "trackNoSex") {
      const { auth, dateTime } = params;

      event.waitUntil(
        getClient(auth).tracker.addDayWithoutSex.mutate({
          dateTime,
          onPeriod: false,
        })
      );
    }
  }
});

async function translateDescriptor({
  id,
  defaultMessage,
  values,
}: {
  id: string;
  defaultMessage: string;
  values?: any;
}) {
  return Promise.race([
    new Promise<string>(async (resolve) => {
      const translation = new MessageChannel();
      translation.port1.onmessage = (event) => {
        logger.debug(
          '[Service Worker]: Translated "%s" to "%s"',
          id,
          event.data
        );
        resolve(event.data);
      };
      const [client] = await sw.clients.matchAll({ type: "window" });
      client?.postMessage({ type: "translate", id, values }, [
        translation.port2,
      ]);
    }),
    new Promise<string>((resolve) => {
      setTimeout(() => resolve("ERR " + defaultMessage), 5000);
    }),
  ]);
}

function getClient(auth?: string) {
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "/trpc",
        headers() {
          return {
            Authorization: auth ? `Bearer ${auth}` : undefined,
          };
        },
      }),
    ],
  });
}
