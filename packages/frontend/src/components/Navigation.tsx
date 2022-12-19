import {
  Box,
  Center,
  Group,
  Navbar,
  Stack,
  Tooltip,
  Transition,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery, useWindowScroll } from "@mantine/hooks";
import {
  IconHeart,
  IconHome,
  IconLogout,
  IconTimeline,
  IconUser,
  TablerIcon,
} from "@tabler/icons";
import { Link, useMatchRoute } from "@tanstack/react-location";
import { useFlag } from "@unleash/proxy-client-react";
import React, { useEffect, useRef, useTransition } from "react";
import { FormattedMessage } from "react-intl";
import { useAuth, useIsAuthenticated } from "../state";

export function Navigation() {
  const theme = useMantineTheme();
  const isTouchBased = useMediaQuery(
    `(max-width: ${theme.breakpoints.md}px)`,
    undefined,
    {
      getInitialValueInEffect: false,
    }
  );

  const showNav = useScrollDisclosure();

  const [, setAuth] = useAuth();
  const isAuthed = useIsAuthenticated();

  const isTrackingEnabled = useFlag("Tracking");

  const [, startTransition] = useTransition();

  if (!isTouchBased) {
    return (
      <Transition
        mounted={isAuthed}
        transition="slide-right"
        duration={400}
        timingFunction="ease"
      >
        {(style) => (
          <Navbar width={{ base: 80 }} p="md" style={style}>
            <Center>
              <Box component="img" src="/icon-192x192.png" sx={{ width: 50 }} />
            </Center>
            <Navbar.Section grow mt={50}>
              <Stack justify="center" spacing={0}>
                <NavbarLink
                  to="/"
                  icon={IconHome}
                  label={<FormattedMessage defaultMessage="Overview" />}
                />
                {isTrackingEnabled && (
                  <NavbarLink
                    to="/tracking"
                    icon={IconTimeline}
                    label={<FormattedMessage defaultMessage="Tracking" />}
                  />
                )}
                <NavbarLink
                  to="/mood"
                  icon={IconHeart}
                  label={<FormattedMessage defaultMessage="Mood" />}
                />
                <NavbarLink
                  to="/account"
                  icon={IconUser}
                  label={<FormattedMessage defaultMessage="User" />}
                />
              </Stack>
            </Navbar.Section>
            <Navbar.Section>
              <Stack justify="center" spacing={0}>
                <NavbarLink
                  to="/"
                  onClick={() => {
                    startTransition(() => {
                      setAuth({ token: null, persist: true });
                      setAuth({ token: null, persist: false });
                    });
                  }}
                  icon={IconLogout}
                  label="Logout"
                />
              </Stack>
            </Navbar.Section>
          </Navbar>
        )}
      </Transition>
    );
  }

  return (
    <Transition
      mounted={showNav && isAuthed}
      transition="slide-up"
      duration={400}
      timingFunction="ease"
    >
      {(style) => (
        <Box
          component="nav"
          style={style}
          sx={(theme) => ({
            position: "fixed",
            bottom: 0,
            width: "100vw",
            boxShadow: theme.shadows.lg,
            zIndex: 100,
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          })}
        >
          <Group position="center" m="xs" spacing={28} noWrap>
            <NavbarLink
              to="/"
              icon={IconHome}
              label={<FormattedMessage defaultMessage="Overview" />}
            />
            {isTrackingEnabled && (
              <NavbarLink
                to="/tracking"
                icon={IconTimeline}
                label={<FormattedMessage defaultMessage="Tracking" />}
              />
            )}
            <NavbarLink
              to="/mood"
              icon={IconHeart}
              label={<FormattedMessage defaultMessage="Mood" />}
            />
            <NavbarLink
              to="/account"
              icon={IconUser}
              label={<FormattedMessage defaultMessage="User" />}
            />
          </Group>
        </Box>
      )}
    </Transition>
  );
}

function NavbarLink({
  icon: Icon,
  label,
  to,
  onClick,
}: {
  icon: TablerIcon;
  label: React.ReactNode;
  to: string;
  onClick?: () => void;
}) {
  const matches = useMatchRoute();

  const theme = useMantineTheme();
  const isTouchBased = useMediaQuery(
    `(max-width: ${theme.breakpoints.md}px)`,
    undefined,
    {
      getInitialValueInEffect: false,
    }
  );

  if (!isTouchBased) {
    return (
      <Tooltip label={label} position="right">
        <Box>
          <UnstyledButton
            component={Link}
            to={to}
            onClick={onClick}
            sx={(theme) => ({
              width: 50,
              height: 50,
              borderRadius: theme.radius.md,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.colors.gray[7],

              "&:hover": {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[0],
              },

              ...(matches({ to }) && {
                "&, &:hover": {
                  backgroundColor: theme.fn.variant({
                    variant: "light",
                    color: theme.primaryColor,
                  }).background,
                  color: theme.fn.variant({
                    variant: "light",
                    color: theme.primaryColor,
                  }).color,
                },
              }),
            })}
          >
            <Icon stroke={1.5} />
          </UnstyledButton>
        </Box>
      </Tooltip>
    );
  }

  return (
    <UnstyledButton
      component={Link}
      to={to}
      onClick={onClick}
      sx={{ width: 60 }}
    >
      <Stack spacing={0} align="center">
        <Icon size={30} stroke={1.5} />
        {label}
      </Stack>
    </UnstyledButton>
  );
}

function useScrollDisclosure() {
  const [isOpen, { open, close }] = useDisclosure(true);

  const [{ y }] = useWindowScroll();
  const previousScrollY = useRef(0);
  const accumulatedScroll = useRef(0);

  useEffect(() => {
    const scrollDy = y - previousScrollY.current;
    accumulatedScroll.current += scrollDy;
    previousScrollY.current = y;

    if (accumulatedScroll.current >= 100) {
      close();
      accumulatedScroll.current = 0;
    }
    if (accumulatedScroll.current < 0) {
      open();
      accumulatedScroll.current = 0;
    }
  }, [y]);

  return isOpen;
}
