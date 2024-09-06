"use client";

import { dayjs } from "@/lib/dayjs";
import { Plural, Trans } from "@lingui/macro";
import { Box, Text, Timeline } from "@mantine/core";
import { IconActivity } from "@tabler/icons-react";
import { useStyles } from "tss-react";

const dateTime = new Intl.DateTimeFormat(undefined, {
	dateStyle: "long",
});
const relativeTime = new Intl.RelativeTimeFormat(undefined, {
	style: "long",
});

export function SexTimeline({
	items,
}: {
	items: {
		date: Date;
		acts: {
			dateTime: string;
			positions: string[];
			userFinished: boolean;
			partnerFinished: boolean;
		}[];
		daysOnPeriod: number;
	}[];
}) {
	const { css } = useStyles();

	return (
		<Timeline mt="md">
			{[...items].reverse().map(({ date, acts, daysOnPeriod }, idx, arr) =>
				acts.length > 0 ? (
					<Timeline.Item
						key={date.toISOString()}
						bullet={<IconActivity />}
						title={acts.map((act) => (
							<Box
								key={act.dateTime}
								className={css({
									cursor: "pointer",
									display: "inline-block",
									marginRight: 8,
								})}
								// onClick={() => onEditAct(act)}
							>
								{`${act.positions.join(", ")} ${act.userFinished ? "🍆" : ""}${act.partnerFinished ? "💦" : ""}`}
							</Box>
						))}
						lineVariant={
							(arr[idx + 1]?.acts.length ?? 0) === 0 ? "dashed" : "solid"
						}
					>
						<Text size="xs" mt={4}>
							{dateTime.format(date)},{" "}
							{relativeTime.format(
								Math.round(
									dayjs(acts.at(-1)?.dateTime).diff(undefined, "days", true),
								),
								"days",
							)}
						</Text>
					</Timeline.Item>
				) : (
					<Timeline.Item
						key={date.toISOString()}
						title={
							<Trans>
								No sex for{" "}
								<Plural
									value={Math.round(
										arr[idx - 1]
											? dayjs(arr[idx - 1].date).diff(date, "days", true)
											: dayjs(date)
													.subtract(1, "day")
													.diff(arr[idx + 1]?.date, "days", true),
									)}
									one="one day"
									other="# days"
								/>{" "}
								:(
							</Trans>
						}
						lineVariant="dashed"
					>
						<Text size="xs" mt={4}>
							{dateTime.format(date)}
							<Plural
								value={daysOnPeriod}
								_0=""
								one=", one day 🩸"
								other=", # days 🩸"
							/>
						</Text>
					</Timeline.Item>
				),
			)}
		</Timeline>
	);
}
