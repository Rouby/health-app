import { dayjs } from "@/lib/dayjs";

export function calculateDaysNotLogged(daysLogged: (Date | string)[]) {
	if (daysLogged.length === 0) {
		return [];
	}

	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const firstTrackedDay = dayjs
		.min(...daysLogged.map((d) => dayjs(d)))!
		.startOf("day");

	const days = Array.from(
		{
			length: Math.ceil(
				dayjs().endOf("day").diff(firstTrackedDay, "day", true),
			),
		},
		(_, idx) => firstTrackedDay.add(idx, "day"),
	);

	return days
		.filter((day) => !daysLogged.some((d) => day.isSame(d, "day")))
		.filter((day) => !day.isSame(dayjs(), "day"))
		.map((day) => day.toDate());
}
