import { DayWithoutSex } from "@/data/daysWithoutSex";
import { SexAct } from "@/data/sexActs";
import { getAbility, verifySession } from "@/lib/ability";
import { dayjs } from "@/lib/dayjs";
import { unstable_cache } from "next/cache";
import { SexTimeline } from "./SexTimeline";

export async function SexTimelineServer() {
	const { userId } = await verifySession();

	const getUserSexActs = unstable_cache(
		async () => {
			const ability = await getAbility();
			const firstDayOfWeek = 1; //getUser.firstDayOfWeek;

			return (await SexAct.filter((act) => ability.can("read", act))).sort(
				(a, b) => dayjs(a.dateTime).diff(dayjs(b.dateTime)),
			);
		},
		[userId],
		{ tags: ["sexActs"] },
	);
	const getUserDaysWithoutSex = unstable_cache(
		async () => {
			const ability = await getAbility();
			const firstDayOfWeek = 1; //getUser.firstDayOfWeek;

			return (await DayWithoutSex.filter((d) => ability.can("read", d))).sort(
				(a, b) => dayjs(a.dateTime).diff(dayjs(b.dateTime)),
			);
		},
		[userId],
		{ tags: ["daysWithoutSex"] },
	);

	const sexActs = await getUserSexActs();

	const daysWithoutSex = await getUserDaysWithoutSex();

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
	const daysWithoutTracking = days
		.filter(
			(day) =>
				![...(sexActs ?? []), ...(daysWithoutSex ?? [])].some((act) =>
					day.isSame(act.dateTime, "day"),
				),
		)
		.filter((day) => !day.isSame(dayjs(), "day"));

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
