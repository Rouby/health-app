import {
  Box,
  Group,
  Stack,
  Transition,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery, useWindowScroll } from "@mantine/hooks";
import { IconHeart, IconHome, IconTimeline, IconUser } from "@tabler/icons";
import { Link, LinkProps } from "@tanstack/react-location";
import React, { useEffect, useRef } from "react";
import { FormattedMessage } from "react-intl";

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

  if (!isTouchBased) {
    return null;
  }

  return (
    <Transition
      mounted={showNav}
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
          <Group position="center" m="xs" spacing={36}>
            <NavButton to="/">
              <IconHome size={36} stroke={1.5} />
              <FormattedMessage defaultMessage="Overview" />
            </NavButton>
            <NavButton to="/tracking">
              <IconTimeline size={36} stroke={1.5} />
              <FormattedMessage defaultMessage="Tracking" />
            </NavButton>
            <NavButton to="/mood">
              <IconHeart size={36} stroke={1.5} />
              <FormattedMessage defaultMessage="Mood" />
            </NavButton>
            <NavButton to="/account">
              <IconUser size={36} stroke={1.5} />
              <FormattedMessage defaultMessage="User" />
            </NavButton>
          </Group>
        </Box>
      )}
    </Transition>
  );
}

function NavButton({
  children,
  ...props
}: { children: React.ReactNode } & LinkProps) {
  return (
    <UnstyledButton component={Link} {...props}>
      <Stack spacing={0} align="center">
        {children}
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
