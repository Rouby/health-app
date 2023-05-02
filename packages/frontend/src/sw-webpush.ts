/// <reference lib="esNext" />
/// <reference lib="webworker" />

import type { AppRouter } from "@rouby/sex-app-backend/src/main";
import type { NotificationPayload } from "@rouby/sex-app-backend/src/webPush";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

const sw: ServiceWorkerGlobalScope = self as any;

sw.addEventListener("pushsubscriptionchange", (event: any) => {
  console.log("[Service Worker]: 'pushsubscriptionchange' event fired.");

  const subscription = sw.registration.pushManager
    .subscribe(event.oldSubscription.options)
    .then(async (subscription) => {
      const client = await getClient();
      client.notification.register.mutate({
        endpoint: subscription.endpoint,
        keys: subscription.toJSON().keys,
      });
    });

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
            sw.registration.showNotification(translation, {
              ...options,
              actions: actions,
            });
          }
        )
      );
    } catch (err) {
      console.error(
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
    const [topic, action, ...params] = event.action.split("_$_");

    if (topic === "tracker") {
      if (action === "noSex") {
        event.waitUntil(
          getClient()
            .then((client) =>
              Promise.all(
                params.map((dateTime) =>
                  client.tracker.addDayWithoutSex.mutate({
                    dateTime,
                    onPeriod: false,
                  })
                )
              )
            )
            .finally(() => sw.clients.openWindow("/tracking"))
        );
      }
    }
  }
});

const translationQueue = new Map<
  string,
  { resolve: (translation: string) => void }
>();
sw.addEventListener("message", (event) => {
  if (event.data.type === "translate") {
    translationQueue.get(event.data.id)?.resolve(event.data.translation);
    translationQueue.delete(event.data.id);
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
  const [client] = await sw.clients.matchAll();

  if (client) {
    return Promise.race([
      new Promise<string>((resolve) => {
        translationQueue.set(id, { resolve });
        client.postMessage({ type: "translate", id, values });
      }),
      new Promise<string>((resolve) => {
        // todo use formatjs to format it?
        setTimeout(() => resolve(defaultMessage), 1000);
      }),
    ]);
  }

  return defaultMessage;
}

let authResolver: undefined | ((auth: string) => void) = undefined;
sw.addEventListener("message", (event) => {
  if (event.data.type === "auth") {
    authResolver?.(event.data.payload);
  }
});

async function getClient() {
  const [client] = await sw.clients.matchAll();

  const auth = client
    ? await Promise.race([
        new Promise<string>((resolve) => {
          authResolver = resolve;
          client.postMessage({ type: "auth" });
        }),
        new Promise<undefined>((resolve) => {
          // todo use formatjs to format it?
          setTimeout(() => resolve(undefined), 1000);
        }),
      ])
    : undefined;

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
