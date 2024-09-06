"use client";

import { vars } from "@/theme";
import { Tooltip, UnstyledButton, rem } from "@mantine/core";
import type { IconHome2 } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStyles } from "tss-react";

export function NavbarLink({
	icon: Icon,
	label,
	...props
}: {
	icon: typeof IconHome2;
	label: React.ReactNode;
} & ({ pathname: string } | { onClick: () => void })) {
	const { css } = useStyles();

	return (
		<Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
			{/* @ts-ignore */}
			<UnstyledButton
				{...("pathname" in props
					? {
							component: Link,
							href: props.pathname,
							"data-active": props.pathname === usePathname() || undefined,
						}
					: {
							onClick: (evt) => {
								evt.preventDefault();
								props.onClick();
							},
						})}
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
			>
				<Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
			</UnstyledButton>
		</Tooltip>
	);
}
