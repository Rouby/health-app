import {
  AppShell,
  Button,
  Container,
  Divider,
  Group,
  LoadingOverlay,
  MantineProvider,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import {
  Outlet,
  parseSearchWith,
  ReactLocation,
  Router,
  stringifySearchWith,
} from "@tanstack/react-location";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useMemo, useState } from "react";
import { IntlProvider } from "react-intl";
import { parse, stringify } from "zipson";
import { LoginForm, Navigation } from "./components";
import { AccountPage, MoodPage, OverviewPage } from "./pages";
import { useAuth, useIsAuthenticated, useLanguage } from "./state";
import { trpc } from "./utils";

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
  const [reactLocation] = useState(
    () =>
      new ReactLocation({
        parseSearch: parseSearchWith((value) =>
          parse(decodeURIComponent(atob(value)))
        ),
        stringifySearch: stringifySearchWith((value) =>
          btoa(encodeURIComponent(stringify(value)))
        ),
      })
  );

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <QueryClientProvider client={queryClient}>
        <Intl>
          <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <Router
              location={reactLocation}
              routes={[
                {
                  element: <Auth />,
                  children: [
                    {
                      path: "account",
                      element: <AccountPage />,
                    },
                    {
                      path: "mood",
                      element: <MoodPage />,
                    },
                    {
                      element: <OverviewPage />,
                    },
                  ],
                },
              ]}
            >
              <AppShell navbar={<Navigation />}>
                <Outlet />
              </AppShell>
            </Router>
          </trpc.Provider>
        </Intl>
      </QueryClientProvider>
    </MantineProvider>
  );
}

function Intl({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useLanguage();

  const messages = useQuery(
    ["locale", locale],
    ({ queryKey: [_, locale] }) =>
      fetch(`lang/${locale}.json`).then((res) => {
        if (!res.ok) {
          if (import.meta.env.DEV) return {};

          throw new Error("Failed to fetch locale");
        }
        return res.json();
      }),
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    }
  );

  if (messages.isLoading) {
    return (
      <LoadingOverlay
        visible
        loaderProps={{ variant: "dots" }}
        overlayBlur={0}
      />
    );
  }

  if (messages.isError) {
    return (
      <Container pt="xl">
        <Title
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            textAlign: "center",
            fontWeight: 900,
            fontSize: 38,
            color: theme.white,

            [theme.fn.smallerThan("sm")]: {
              fontSize: 32,
            },
          })}
        >
          Could not load locale
        </Title>
        <Text
          size="lg"
          align="center"
          sx={(theme) => ({
            maxWidth: 540,
            margin: "auto",
            marginTop: theme.spacing.xl,
            marginBottom: theme.spacing.xl * 1.5,
            color: theme.colors[theme.primaryColor][1],
          })}
        >
          There was a problem loading the locale messages for your language (
          {locale}). Try refreshing the page or continue with the default
          language (en).
        </Text>
        <Group position="center">
          <Button
            variant="light"
            size="md"
            onClick={() => window.location.reload()}
          >
            Refresh the page
          </Button>
          <Button variant="light" size="md" onClick={() => setLocale("en")}>
            Continue with english
          </Button>
        </Group>
      </Container>
    );
  }

  return (
    <IntlProvider
      locale={locale}
      messages={messages.data ?? {}}
      defaultLocale="en"
    >
      {children}
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
