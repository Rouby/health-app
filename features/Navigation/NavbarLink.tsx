"use client";

import { vars } from "@/theme";
import { Tooltip, UnstyledButton, rem } from "@mantine/core";
import type { IconHome2 } from "@tabler/icons-react";
import { useStyles } from "tss-react";

export function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}) {
  const { css } = useStyles();

  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={css({
          width: rem(50),
          height: rem(50),
          borderRadius: vars.radius.md,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: `light-dark(${vars.colors.gray[7]}, ${vars.colors.dark[0]})`,

          "&:hover": {
            backgroundColor: `light-dark(${vars.colors.gray[0]}, ${vars.colors.dark[5]})`,
          },

          "&[data-active]": {
            "&:hover": {
              backgroundColor: vars.colors.blue.light,
              color: vars.colors.blue.lightColor,
            },
          },
        })}
        data-active={active || undefined}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}
