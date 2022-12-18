/// <reference lib="esNext" />
/// <reference lib="webworker" />

import type { AppRouter } from "@rouby/sex-app-backend/src/main";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/trpc",
      headers() {
        // const auth =
        //   sessionStorage.getItem("token") ?? localStorage.getItem("token");
        const auth = undefined;
        return {
          Authorization: auth ? `Bearer ${auth}` : undefined,
        };
      },
    }),
  ],
});

const sw: ServiceWorkerGlobalScope = self as any;

sw.addEventListener("pushsubscriptionchange", (event: any) => {
  console.log("[Service Worker]: 'pushsubscriptionchange' event fired.");

  const subscription = sw.registration.pushManager
    .subscribe(event.oldSubscription.options)
    .then((subscription) =>
      client.notification.register.mutate({
        endpoint: subscription.endpoint,
        keys: subscription.toJSON().keys,
      })
    );

  event.waitUntil(subscription);
});

sw.addEventListener("push", (event) => {
  console.log("[Service Worker]: 'push' event fired.", event);

  if (event.data) {
    try {
      const { title, ...options } = event.data.json();
      sw.registration.showNotification(title, options);
    } catch (err) {
      console.log(
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
    // event.reply;
    // Do something as the result of the notification click
    // const promiseChain = doSomething();
    // event.waitUntil(promiseChain);
  }
});
