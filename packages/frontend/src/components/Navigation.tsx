import { Box, Group, Stack, Transition, UnstyledButton } from "@mantine/core";
import { useDisclosure, useMediaQuery, useWindowScroll } from "@mantine/hooks";
import { IconHome } from "@tabler/icons";
import { Link, LinkProps } from "@tanstack/react-location";
import React, { useEffect, useRef } from "react";
import { FormattedMessage } from "react-intl";

export function Navigation() {
  const isTouchBased = useMediaQuery("(hover: none)", undefined, {
    getInitialValueInEffect: false,
  });

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
              <IconHome size={36} />
              <FormattedMessage defaultMessage="Tracking" />
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
