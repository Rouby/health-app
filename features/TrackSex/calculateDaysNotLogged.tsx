import { dayjs } from "@/lib/dayjs";

export function calculateDaysNotLogged(
	daysLogged: (Date | string)[],
	until = new Date(),
) {
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
				dayjs(until).endOf("day").diff(firstTrackedDay, "day", true),
			),
		},
		(_, idx) => firstTrackedDay.add(idx, "day"),
	);

	return days
		.filter((day) => !daysLogged.some((d) => day.isSame(d, "day")))
		.filter((day) => !day.isSame(until, "day"))
		.map((day) => day.format("YYYY-MM-DD"));
}
