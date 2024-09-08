"use client";

import { mq, vars } from "@/theme";
import { Trans } from "@lingui/macro";
import { Group, rem } from "@mantine/core";
import { IconHome2, IconTimeline } from "@tabler/icons-react";
import { useStyles } from "tss-react";
import { NavbarLink } from "./NavbarLink";

export function NavigationBar() {
	const { css } = useStyles();

	return (
		<Group
			component="nav"
			justify="center"
			className={css({
				display: "none",
				position: "fixed",
				bottom: 0,
				left: 0,
				right: 0,
				height: rem(60),
				backgroundColor: vars.colors.gray[9],
				zIndex: 1,

				[mq.sm]: {
					display: "flex",
				},
			})}
		>
			<NavbarLink
				pathname="/"
				icon={IconHome2}
				label={<Trans>Dashboard</Trans>}
			/>
			<NavbarLink
				pathname="/tracking"
				icon={IconTimeline}
				label={<Trans>Tracking</Trans>}
			/>
		</Group>
	);
}
