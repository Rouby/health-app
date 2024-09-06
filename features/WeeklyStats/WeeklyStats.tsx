"use client";

import { dayjs } from "@/lib/dayjs";
import { mq, vars } from "@/theme";
import { Trans } from "@lingui/macro";
import {
	Box,
	Group,
	type PolymorphicComponentProps,
	Text,
	UnstyledButton,
	type UnstyledButtonProps,
} from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";
import { useStyles } from "tss-react";
import { StatCard } from "./StatCard";

const dateTimeFormat = new Intl.DateTimeFormat(undefined, {
	month: "long",
	day: "2-digit",
});

export function WeeklyStats({
	stats,
}: {
	stats: {
		week: Date;
		averageDuration: string;
		totalActs: number;
	}[];
}) {
	const { css } = useStyles();

	const [week, setWeek] = useState(0);

	return (
		<>
			<Box
				className={css({
					backgroundImage: `linear-gradient(-60deg, ${
						vars.colors.grape[4]
					} 0%, ${vars.colors.primaryColors[7]} 100%)`,
					padding: vars.spacing.md,
					borderRadius: vars.radius.md,
					display: "flex",
					flexDirection: "row-reverse",
					justifyContent: "space-between",
					gap: vars.spacing.md,

					[mq.xs]: {
						flexDirection: "column",
						paddingTop: 0,
					},
				})}
			>
				<Box
					className={css({
						display: "grid",
						gridTemplateColumns: "auto 1fr",
						gridTemplateAreas: `
              "week next"
              "week prev"
            `,
						columnGap: vars.spacing.md,
						alignContent: "center",

						[mq.xs]: {
							gridTemplateAreas: `
                "next week"
                "prev week"
              `,
						},
					})}
				>
					<StepperButton
						onClick={() => setWeek((current) => current - 1)}
						disabled={week <= 0}
					>
						<IconChevronUp stroke={1.5} />
					</StepperButton>

					<Box
						className={css({
							gridArea: "week",
							alignSelf: "center",
							justifySelf: "start",
							fontWeight: 700,
							color: vars.colors.white,
						})}
					>
						<Text>
							{dateTimeFormat.formatRange(
								stats.at(-(week + 1))?.week ?? new Date(),
								dayjs(stats.at(-(week + 1))?.week)
									.add(1, "week")
									.toDate(),
							)}
						</Text>
					</Box>

					<StepperButton
						onClick={() => setWeek((current) => current - 1)}
						disabled={week <= 0}
					>
						<IconChevronDown stroke={1.5} />
					</StepperButton>
				</Box>

				<Group>
					<StatCard
						label={<Trans>Sex acts</Trans>}
						value={stats.at(-week - 1)?.totalActs}
						size={60}
					/>
					<StatCard
						label={<Trans>Average duration</Trans>}
						value={
							dayjs
								.duration(stats.at(-week - 1)?.averageDuration ?? "")
								.asMilliseconds() === 0
								? "/"
								: dayjs
										.duration(stats.at(-week - 1)?.averageDuration ?? "")
										.humanize()
						}
						size={
							dayjs
								.duration(stats.at(-week - 1)?.averageDuration ?? "")
								.asMilliseconds() === 0
								? 50
								: 30
						}
					/>
				</Group>
			</Box>
		</>
	);
}

function StepperButton(
	props: PolymorphicComponentProps<"button", UnstyledButtonProps>,
) {
	const { css } = useStyles();

	return (
		<UnstyledButton
			className={css({
				height: 28,
				width: "100%",
				color: vars.colors.primaryColors[2],
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				borderRadius: vars.radius.md,
				transition: "background-color 50ms ease",

				[mq.xs]: {
					height: 34,
					width: 34,
				},

				":disabled": { opacity: 0.5 },
			})}
			{...props}
		/>
	);
}
