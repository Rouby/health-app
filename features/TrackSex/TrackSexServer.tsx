import { DayWithoutSex } from "@/data/daysWithoutSex";
import { SexAct } from "@/data/sexActs";
import { getAbility, verifySession } from "@/lib/ability";
import { dayjs } from "@/lib/dayjs";
import { unstable_cache } from "next/cache";
import { TrackSex } from "./TrackSex";

export async function TrackSexServer() {
	const { userId } = await verifySession();

	const getUserSexActs = unstable_cache(
		async () => {
			const ability = await getAbility();

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

			return (await DayWithoutSex.filter((d) => ability.can("read", d))).sort(
				(a, b) => dayjs(a.dateTime).diff(dayjs(b.dateTime)),
			);
		},
		[userId],
		{ tags: ["daysWithoutSex"] },
	);

	const ability = await getAbility();

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

	const daysNotLogged = days
		.filter(
			(day) =>
				![...(sexActs ?? []), ...(daysWithoutSex ?? [])].some((act) =>
					day.isSame(act.dateTime, "day"),
				),
		)
		.filter((day) => !day.isSame(dayjs(), "day"))
		.map((day) => day.toDate());

	return (
		<TrackSex
			daysNotLogged={daysNotLogged}
			positions={[
				...new Set(sexActs.flatMap((act) => act.positions).filter(Boolean)),
			]}
			locations={[
				...new Set(sexActs.map((act) => act.location).filter(Boolean)),
			]}
			foreplaysOnUser={[
				...new Set(sexActs.map((act) => act.foreplayOnUser).filter(Boolean)),
			]}
			foreplaysOnPartner={[
				...new Set(sexActs.map((act) => act.foreplayOnPartner).filter(Boolean)),
			]}
		/>
	);
}
