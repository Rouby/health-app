"use client";

import { signout } from "@/app/actions/auth";
import { vars } from "@/theme";
import { Trans } from "@lingui/macro";
import { Center, Stack, rem } from "@mantine/core";
import { IconHome2, IconLogout, IconTimeline } from "@tabler/icons-react";
import Image from "next/image";
import { useActionState } from "react";
import { useStyles } from "tss-react";
import { NavbarLink } from "./NavbarLink";
import icon from "./icon.png";

export function Navigation() {
	const { css } = useStyles();

	const [, action] = useActionState(signout, undefined);

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
			<Center>
				<Image src={icon} alt="icon" width={50} />
			</Center>

			<div
				className={css({
					flex: 1,
					marginTop: rem(50),
				})}
			>
				<Stack justify="center" gap={0}>
					<NavbarLink
						pathname="/"
						icon={IconHome2}
						label={<Trans>Dashboard</Trans>}
					/>
				</Stack>

				<Stack justify="center" gap={0}>
					<NavbarLink
						pathname="/tracking"
						icon={IconTimeline}
						label={<Trans>Tracking</Trans>}
					/>
				</Stack>
			</div>

			<Stack justify="center" gap={0}>
				<NavbarLink icon={IconLogout} label="Logout" onClick={() => action()} />
			</Stack>
		</nav>
	);
}
