import { getUserDaysWithoutSex } from "@/cached/getUserDaysWithoutSex";
import { getUserSexActs } from "@/cached/getUserSexActs";
import type { SexAct } from "@/data/sexActs";
import { verifySession } from "@/lib/ability";
import { dayjs } from "@/lib/dayjs";
import { SexTimeline } from "./SexTimeline";

export async function SexTimelineServer() {
	const { userId } = await verifySession();

	const sexActs = await getUserSexActs(userId);

	const daysWithoutSex = await getUserDaysWithoutSex(userId);

	const firstTrackedDay = dayjs
		.min(
			dayjs(sexActs?.at(0)?.dateTime),
			dayjs(daysWithoutSex?.at(0)?.dateTime),
		)
		.startOf("day");

	const days = Array.from(
		{
			length: Math.ceil(
				dayjs().endOf("day").diff(firstTrackedDay, "day", true),
			),
		},
		(_, idx) => firstTrackedDay.add(idx, "day"),
	);

	const timelineEvents = days.reduce(
		(acc, day) => {
			const sexActsOnDate =
				sexActs?.filter((sexAct) =>
					dayjs(sexAct.dateTime).isSame(day, "day"),
				) ?? [];

			if (sexActsOnDate.length > 0) {
				acc.push({
					date: day.toDate(),
					acts: sexActsOnDate,
					daysOnPeriod: 0,
				});
			} else {
				const onPeriod =
					daysWithoutSex?.find((wo) => dayjs(wo.dateTime).isSame(day, "day"))
						?.onPeriod ?? false;
				if (acc.length === 0) {
					acc.push({
						date: day.toDate(),
						acts: [],
						daysOnPeriod: onPeriod ? 1 : 0,
					});
				} else if ((acc.at(-1)?.acts.length ?? 0) > 0) {
					acc.push({
						date: day.toDate(),
						acts: [],
						daysOnPeriod: onPeriod ? 1 : 0,
					});
				} else {
					(acc.at(-1) ?? { daysOnPeriod: 0 }).daysOnPeriod += onPeriod ? 1 : 0;
				}
			}

			return acc;
		},
		[] as {
			date: Date;
			acts: SexAct[];
			daysOnPeriod: number;
		}[],
	);

	let previousDaysOnPeriod = undefined;
	if (timelineEvents.at(-1)?.acts.length === 0) {
		previousDaysOnPeriod = timelineEvents.pop()?.daysOnPeriod;
	}
	if (!dayjs().isSame(timelineEvents.at(-1)?.date, "day")) {
		timelineEvents.push({
			date: dayjs().endOf("day").toDate(),
			acts: [],
			daysOnPeriod: previousDaysOnPeriod ?? 0,
		});
	}

	return <SexTimeline items={timelineEvents} />;
}
