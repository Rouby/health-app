import {
  Box,
  Button,
  Group,
  Notification,
  Text,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useRegisterSW } from "virtual:pwa-register/react";
import { trpc } from "../utils";

export function ServiceWorker() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
      if (registration) {
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);
      }
    },
  });

  useNotifications();

  const theme = useMantineTheme();
  const isTouchBased = useMediaQuery(
    `(max-width: ${theme.breakpoints.md}px)`,
    undefined,
    {
      getInitialValueInEffect: false,
    }
  );

  return (
    <Box
      sx={{
        position: "fixed",
        ...(isTouchBased ? { top: 0, left: 0 } : { bottom: 0, right: 0 }),
        zIndex: 101,
      }}
      m="xs"
    >
      <Transition
        mounted={needRefresh}
        transition={isTouchBased ? "slide-down" : "slide-up"}
        duration={400}
        timingFunction="ease"
      >
        {(style) => (
          <Notification
            style={style}
            title={<FormattedMessage defaultMessage="App update available" />}
            onClose={() => {
              setNeedRefresh(false);
            }}
          >
            <Text>
              <FormattedMessage defaultMessage="New content available, click on reload button to update." />
            </Text>
            <Group position="right" noWrap>
              {needRefresh && (
                <Button onClick={() => updateServiceWorker(true)}>
                  Reload
                </Button>
              )}
            </Group>
          </Notification>
        )}
      </Transition>
    </Box>
  );
}

function useNotifications() {
  const { mutateAsync } = trpc.notification.register.useMutation();

  useEffect(() => {
    let mounted = true;
    new Promise(async () => {
      const registration = await navigator.serviceWorker.ready;

      const state =
        (await registration.pushManager?.permissionState({
          userVisibleOnly: true,
          applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
        })) ?? "unavailable";

      const subscription = await registration.pushManager?.getSubscription();

      if (mounted) {
        if (state === "prompt" || (state === "granted" && !subscription)) {
          registration.pushManager
            ?.subscribe({
              userVisibleOnly: true,
              applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
            })
            .then((subscription) => {
              const subscriptionJson = subscription.toJSON();

              return mutateAsync({
                endpoint: subscriptionJson.endpoint ?? "",
                keys: {
                  p256dh: subscriptionJson.keys?.p256dh ?? "",
                  auth: subscriptionJson.keys?.auth ?? "",
                },
              }).then(() => subscription);
            })
            .then((subscription) => {
              return "subscribed" as const;
            })
            .catch((err) => {
              if (window.Notification.permission === "denied") {
                return "denied" as const;
              } else {
                console.error("Unable to subscribe to push.", err);
                registration.pushManager
                  .getSubscription()
                  .then((sub) => sub?.unsubscribe());
                return "failed" as const;
              }
            });
        }
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const { formatMessage: fmt } = useIntl();
  useEffect(() => {
    navigator.serviceWorker.addEventListener("message", handler);

    return () =>
      navigator.serviceWorker.removeEventListener("message", handler);

    function handler(event: MessageEvent) {
      const interaction = window.newrelic?.interaction();
      interaction?.setName(event.data.type, "service-worker");

      if (event.data.type === "translate") {
        interaction?.setAttribute("id", event.data.id);
        interaction?.setAttribute("values", JSON.stringify(event.data.values));

        event.ports[0].postMessage(
          fmt(
            {
              id: event.data.id,
              defaultMessage: event.data.defaultMessage,
            },
            restoreDates(event.data.values)
          )
        );
      }

      interaction?.save();
      interaction?.end();
    }
  }, []);
}

function restoreDates(
  obj: Record<string, string | number | boolean>
): Record<string, string | number | boolean | Date> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (typeof value === "string") {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return [key, date];
        }
      }
      return [key, value];
    })
  );
}
