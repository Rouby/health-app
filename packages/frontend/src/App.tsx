import {
  AppShell,
  Container,
  Divider,
  MantineProvider,
  Paper,
  Text,
} from "@mantine/core";
import {
  Outlet,
  parseSearchWith,
  ReactLocation,
  Router,
  stringifySearchWith,
} from "@tanstack/react-location";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useMemo, useState } from "react";
import { IntlProvider } from "react-intl";
import { parse, stringify } from "zipson";
import { LoginForm } from "./components";
import { OverviewPage } from "./pages";
import { useAuth, useIsAuthenticated } from "./state";
import { trpc } from "./utils";

const reactLocation = new ReactLocation({
  parseSearch: parseSearchWith((value) =>
    parse(decodeURIComponent(atob(value)))
  ),
  stringifySearch: stringifySearchWith((value) =>
    btoa(encodeURIComponent(stringify(value)))
  ),
});

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [auth] = useAuth();
  const trpcClient = useMemo(
    () =>
      trpc.createClient({
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
      }),
    [auth]
  );

  return (
    <IntlProvider locale="de" onError={() => {}}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Router
            location={reactLocation}
            routes={[
              {
                path: "/",
                element: <Auth />,
                pendingElement: "loading...",
                children: [
                  {
                    element: <OverviewPage />,
                  },
                ],
              },
            ]}
          >
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={{ colorScheme: "dark" }}
            >
              <AppShell>
                <Outlet />
              </AppShell>
            </MantineProvider>
          </Router>
        </QueryClientProvider>
      </trpc.Provider>
    </IntlProvider>
  );
}

function Auth() {
  const {
    mutateAsync: login,
    isLoading: isLoggingIn,
    error: loginError,
  } = trpc.auth.login.useMutation();

  const {
    mutateAsync: register,
    isLoading: isRegistering,
    error: registerError,
  } = trpc.auth.register.useMutation();

  const [, setAuth] = useAuth();
  const isAuthed = useIsAuthenticated();

  if (isAuthed) {
    return <Outlet />;
  }

  return (
    <>
      <Container size="xs" px="xs">
        <Paper radius="md" p="xl" withBorder>
          <Text size="lg" weight={500}>
            Welcome to Sex App
          </Text>

          <Divider my="lg" />

          <LoginForm
            onSubmit={(values) =>
              (values.mode === "login"
                ? login({
                    email: values.email,
                    password: values.password,
                  })
                : register({
                    email: values.email,
                    password: values.password,
                    name: values.name,
                  })
              ).then((token) => {
                setAuth({ token, persist: values.rememberMe });
              })
            }
            loading={isLoggingIn || isRegistering}
            error={loginError?.message ?? registerError?.message}
          />
        </Paper>
      </Container>
    </>
  );
}
