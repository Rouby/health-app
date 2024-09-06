import { getUserDaysWithoutSex } from "@/cached/getUserDaysWithoutSex";
import { getUserSexActs } from "@/cached/getUserSexActs";
import { verifySession } from "@/lib/ability";
import { TrackSex } from "./TrackSex";
import { calculateDaysNotLogged } from "./calculateDaysNotLogged";

export async function TrackSexServer() {
	const { userId } = await verifySession();

	const sexActs = await getUserSexActs(userId);

	const daysWithoutSex = await getUserDaysWithoutSex(userId);

	const daysNotLogged = calculateDaysNotLogged([
		...sexActs.map((d) => d.dateTime),
		...daysWithoutSex.map((d) => d.date),
	]);

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
