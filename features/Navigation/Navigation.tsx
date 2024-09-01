"use client";

import { signout } from "@/app/actions/auth";
import { vars } from "@/theme";
import { Center, rem, Stack } from "@mantine/core";
import { IconHome2, IconLogout } from "@tabler/icons-react";
import { useActionState } from "react";
import { useStyles } from "tss-react";
import { NavbarLink } from "./NavbarLink";

export function Navigation() {
  const { css } = useStyles();

  const [state, action, pending] = useActionState(signout, undefined);

  return (
    <nav
      className={css({
        width: rem(80),
        height: "100vh",
        padding: vars.spacing.md,
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Center>icon</Center>

      <div
        className={css({
          flex: 1,
          marginTop: rem(50),
        })}
      >
        <Stack justify="center" gap={0}>
          <NavbarLink icon={IconHome2} label="Home" />
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconLogout} label="Logout" onClick={() => action()} />
      </Stack>
    </nav>
  );
}
