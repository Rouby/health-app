"use client";

import { Trans } from "@lingui/macro";
import { Button, Collapse, Group, Paper, Stack } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import Link from "next/link";
import { DayWithoutSexForm } from "./DayWithoutSexForm";
import { SexActForm } from "./SexActForm";

export function TrackSex({
	daysNotLogged,
	positions,
	locations,
	foreplaysOnUser,
	foreplaysOnPartner,
}: {
	daysNotLogged: Date[];
	positions: string[];
	locations: string[];
	foreplaysOnUser: string[];
	foreplaysOnPartner: string[];
}) {
	const [show, toggleShow] = useToggle([false, "sexAct", "noSexDay"] as const);

	return (
		<>
			{daysNotLogged.length > 0 && (
				<>
					<Trans>You have {daysNotLogged.length} days not logged.</Trans>

					<Stack align="start" gap={0}>
						{daysNotLogged.map((day) => (
							<Button
								key={day.toISOString()}
								variant="transparent"
								component={Link}
								replace
								href={{ search: `?dateTime=${day.toISOString()}` }}
								scroll={false}
							>
								{day.toLocaleDateString(undefined, { dateStyle: "long" })}
							</Button>
						))}
					</Stack>
				</>
			)}

			<Group mt="md">
				<Button
					onClick={() => {
						toggleShow((v) => (v === "sexAct" ? false : "sexAct"));
					}}
				>
					<Trans>Track sex act</Trans>
				</Button>
				<Button
					onClick={() => {
						toggleShow((v) => (v === "noSexDay" ? false : "noSexDay"));
					}}
				>
					<Trans>Track day without sex</Trans>
				</Button>
			</Group>

			<Collapse in={!!show} mt="md">
				<Paper radius="md" p="xl" withBorder>
					{show === "noSexDay" ? (
						<DayWithoutSexForm daysNotLogged={daysNotLogged} />
					) : (
						<SexActForm
							positions={positions}
							locations={locations}
							foreplaysOnUser={foreplaysOnUser}
							foreplaysOnPartner={foreplaysOnPartner}
						/>
					)}
				</Paper>
			</Collapse>
		</>
	);
}
