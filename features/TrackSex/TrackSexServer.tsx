import { getUserDaysWithoutSex } from "@/cached/getUserDaysWithoutSex";
import { getUserSexActs } from "@/cached/getUserSexActs";
import { verifySession } from "@/lib/ability";
import { dayjs } from "@/lib/dayjs";
import { TrackSex } from "./TrackSex";

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

	const daysLogged = [...sexActs, ...daysWithoutSex];
	const daysNotLogged = days
		.filter((day) => !daysLogged.some((d) => day.isSame(d.dateTime, "day")))
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
