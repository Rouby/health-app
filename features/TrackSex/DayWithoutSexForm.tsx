"use client";

import { trackDayWithoutSex } from "@/app/actions/track";
import { dayjs } from "@/lib/dayjs";
import { Trans } from "@lingui/macro";
import { Box, Button, Checkbox, Group, Stack, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { startTransition, useActionState } from "react";
import { useStyles } from "tss-react";

export function DayWithoutSexForm({
	daysNotLogged,
}: { daysNotLogged: Date[] }) {
	const { css } = useStyles();

	const [state, action, pending] = useActionState(
		trackDayWithoutSex,
		undefined,
	);

	return (
		<form
			onSubmit={(evt) => {
				evt.preventDefault();
				const formData = new FormData(evt.currentTarget);
				formData.set(
					"date",
					dayjs(formData.get("date") as string).format("YYYY-MM-DD"),
				);
				startTransition(() => action(formData));
			}}
		>
			<Stack>
				<DatePickerInput
					required
					w={150}
					name="date"
					label={<Trans>Date</Trans>}
					excludeDate={(date) =>
						!daysNotLogged.some((d) => dayjs(d).isSame(date, "day"))
					}
					renderDay={(date) => {
						return (
							<Box
								className={css({
									background: dayjs(date).isSame(new Date(), "day")
										? "rgba(0,0,255,.2)"
										: undefined,
									borderRadius: "50%",
								})}
							>
								{date.getDate()}
							</Box>
						);
					}}
				/>

				<Checkbox name="onPeriod" label={<Trans>On Period?</Trans>} />
			</Stack>

			<Group justify="space-between" mt="md" wrap="nowrap">
				<Text c="red">
					{state && !state?.success && <Trans>Could not track</Trans>}
				</Text>
				<Button type="submit" loading={pending}>
					<Trans>Save</Trans>
				</Button>
			</Group>
		</form>
	);
}
