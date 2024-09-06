"use client";

import { vars } from "@/theme";
import { Box, Paper, Text } from "@mantine/core";
import { useStyles } from "tss-react";

export function StatCard({
	label,
	value,
	size,
}: {
	label: React.ReactNode;
	value: React.ReactNode;
	size: number;
}) {
	const { css } = useStyles();
	return (
		<Paper
			radius="md"
			shadow="md"
			p="xs"
			className={css({
				minWidth: 120,
				maxWidth: 120,
				paddingTop: vars.spacing.xl,
				minHeight: 140,
				display: "flex",
				flex: 1,
				flexDirection: "column",
				justifyContent: "space-between",
				alignItems: "center",
				backgroundColor: vars.colors.white,
				color: vars.colors.gray[7],
			})}
		>
			<Box
				className={css({
					marginTop: vars.spacing.lg,
					color: vars.colors.primaryColors[6],
					fontSize: size,
					lineHeight: 1,
					textAlign: "center",
				})}
			>
				{value}
			</Box>
			<Text size="xs">{label}</Text>
		</Paper>
	);
}
