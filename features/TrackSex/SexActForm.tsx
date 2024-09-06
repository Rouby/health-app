"use client";

import { trackSexAct } from "@/app/actions/track";
import { dayjs } from "@/lib/dayjs";
import { Trans, t } from "@lingui/macro";
import {
	Box,
	Button,
	Group,
	Input,
	NumberInput,
	SegmentedControl,
	Stack,
	Switch,
	TagsInput,
	Text,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useStyles } from "tss-react";

export function SexActForm({
	positions,
	locations,
	foreplaysOnUser,
	foreplaysOnPartner,
}: {
	positions: string[];
	locations: string[];
	foreplaysOnUser: string[];
	foreplaysOnPartner: string[];
}) {
	const { css } = useStyles();

	const [state, action, pending] = useActionState(trackSexAct, undefined);

	const search = useSearchParams();

	return (
		<form
			onSubmit={(evt) => {
				evt.preventDefault();
				const formData = new FormData(evt.currentTarget);
				action(formData);
			}}
		>
			<Stack>
				<TagsInput
					name="positions"
					error={state?.errors.positions?.join(", ")}
					required
					label={<Trans>Positions</Trans>}
					placeholder={t`Missionary, Doggy, Cowgirl, Reverse Cowgirl, 69, Spooning, etc.`}
					data={positions}
				/>

				<Group align="baseline">
					<DateTimePicker
						key={search.get("dateTime")}
						w={150}
						name="dateTime"
						error={state?.errors.dateTime?.join(", ")}
						defaultValue={new Date(search.get("dateTime") ?? new Date())}
						required
						label={<Trans>Date</Trans>}
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

					<NumberInput
						name="duration"
						error={state?.errors.duration?.join(", ")}
						label={<Trans>Duration (minutes)</Trans>}
						list="durations"
					/>
					<datalist id="durations">
						{[5, 10, 15, 20, 25, 30].map((minutes) => (
							<option key={minutes} value={minutes.toString()}>
								<Trans>{minutes} minutes</Trans>
							</option>
						))}
					</datalist>
				</Group>

				<Input.Wrapper label={<Trans>Initiated by</Trans>}>
					<SegmentedControl
						name="initiator"
						data={[
							{
								value: "me",
								label: <Trans>Me</Trans>,
							},
							{
								value: "partner",
								label: <Trans>Partner</Trans>,
							},
						]}
					/>
				</Input.Wrapper>

				<TagsInput
					name="location"
					error={state?.errors.location?.join(", ")}
					label={<Trans>Location</Trans>}
					placeholder={t`Bedroom, Kitchen, Living room, etc.`}
					data={locations}
					maxTags={1}
				/>

				<Group>
					<TagsInput
						w={300}
						name="foreplayOnUser"
						error={state?.errors.foreplayOnUser?.join(", ")}
						label={<Trans>Received foreplay by me</Trans>}
						placeholder={t`Oral, fingering, etc.`}
						data={foreplaysOnUser}
						maxTags={1}
					/>
					<Switch
						name="userFinished"
						error={state?.errors.userFinished?.join(", ")}
						size="md"
						pt="lg"
						label={
							<>
								🍆 <Trans>I came</Trans>
							</>
						}
					/>
				</Group>

				<Group>
					<TagsInput
						w={300}
						name="foreplayOnPartner"
						error={state?.errors.foreplayOnPartner?.join(", ")}
						label={<Trans>Received foreplay by partner</Trans>}
						placeholder={t`Oral, fingering, etc.`}
						data={foreplaysOnPartner}
						maxTags={1}
					/>
					<Switch
						name="partnerFinished"
						error={state?.errors.partnerFinished?.join(", ")}
						size="md"
						pt="lg"
						label={
							<>
								💦 <Trans>Partner came</Trans>
							</>
						}
					/>
				</Group>
			</Stack>

			<Group justify="space-between" mt="md" wrap="nowrap">
				<Text c="red">{state?.errors && <Trans>Could not track</Trans>}</Text>
				<Group justify="right" wrap="nowrap">
					<Button type="submit" loading={pending}>
						<Trans>Save</Trans>
					</Button>
				</Group>
			</Group>
		</form>
	);
}
