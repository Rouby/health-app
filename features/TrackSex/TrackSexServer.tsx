import { DayWithoutSex } from "@/data/daysWithoutSex";
import { SexAct } from "@/data/sexActs";
import { getAbility, verifySession } from "@/lib/ability";
import { dayjs } from "@/lib/dayjs";
import { logger } from "@/lib/logger";
import { unstable_cache } from "next/cache";
import type { UUID } from "node:crypto";
import { TrackSex } from "./TrackSex";

const getUserSexActs = unstable_cache(
	async (userId: UUID) => {
		const ability = getAbility(userId);
		const firstDayOfWeek = 1; //getUser.firstDayOfWeek;

		logger.info({ ability }, "get cache 3");

		return (await SexAct.filter((act) => ability.can("read", act))).sort(
			(a, b) => dayjs(a.dateTime).diff(dayjs(b.dateTime)),
		);
	},
	[],
	{ tags: ["sexActs"] },
);

const getUserDaysWithoutSex = unstable_cache(
	async (userId: UUID) => {
		const ability = getAbility(userId);
		const firstDayOfWeek = 1; //getUser.firstDayOfWeek;

		return (await DayWithoutSex.filter((d) => ability.can("read", d))).sort(
			(a, b) => dayjs(a.dateTime).diff(dayjs(b.dateTime)),
		);
	},
	[],
	{ tags: ["daysWithoutSex"] },
);

export async function TrackSexServer() {
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
