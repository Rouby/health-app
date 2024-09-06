import { getUserDaysWithoutSex } from "@/cached/getUserDaysWithoutSex";
import { getUserSexActs } from "@/cached/getUserSexActs";
import { verifySession } from "@/lib/ability";
import { dayjs } from "@/lib/dayjs";
import { WeeklyStats } from "./WeeklyStats";

export async function WeeklyStatsServer() {
	const { userId } = await verifySession();

	const sexActs = await getUserSexActs(userId);

	const daysWithoutSex = await getUserDaysWithoutSex(userId);

	const firstDayOfWeek = 1;

	const mostConsecutiveDaysWithoutSex = daysWithoutSex.reduce(
		(acc, day) => {
			if (acc.currentStreak === 0) {
				acc.currentStreak = 1;
				acc.longestStreak = 1;
				acc.lastDay = new Date(day.dateTime);
			} else {
				const lastDay = dayjs(acc.lastDay);
				const currentDay = dayjs(day.dateTime);

				if (lastDay.add(1, "day").isSame(currentDay, "day")) {
					acc.currentStreak += 1;
					acc.longestStreak = Math.max(acc.longestStreak, acc.currentStreak);
				} else {
					acc.currentStreak = 1;
				}

				acc.lastDay = new Date(day.dateTime);
			}

			return acc;
		},
		{
			currentStreak: 0,
			longestStreak: 0,
			lastDay: undefined as undefined | Date,
		},
	).longestStreak;

	// group sexActs by week
	const groupedByWeek = sexActs.reduce((acc, act) => {
		const week = dayjs(act.dateTime)
			.startOf("week")
			.add(firstDayOfWeek, "days")
			.toISOString();

		if (!acc.has(week)) {
			acc.set(week, []);
		}

		acc.get(week)?.push(act);

		return acc;
	}, new Map<string, typeof sexActs>());

	if (sexActs.length > 0) {
		// fill in missing weeks
		const firstWeek = dayjs(sexActs.at(0)?.dateTime)
			.startOf("week")
			.add(firstDayOfWeek, "days");
		const lastWeek = dayjs()
			.startOf("week")
			.add(firstDayOfWeek, "days")
			.add(1, "week");

		let currentWeek = firstWeek;
		while (currentWeek.isBefore(lastWeek)) {
			if (!groupedByWeek.has(currentWeek.toISOString())) {
				groupedByWeek.set(currentWeek.toISOString(), []);
			}
			currentWeek = currentWeek.add(1, "week");
		}
	}

	return (
		<WeeklyStats
			stats={Array.from(groupedByWeek.entries())
				.map(([week, acts]) => {
					return {
						week: dayjs(week).toDate(),
						averageDuration: calculateAverageDuration(acts),
						totalActs: acts.length,
					};
				})
				.sort((a, b) => {
					return dayjs(a.week).isBefore(b.week) ? -1 : 1;
				})}
		/>
	);
}

function calculateAverageDuration(acts: { duration?: string | null }[]) {
	const actsWithDuration = acts.filter(
		(act): act is { duration: string } => !!act.duration,
	);
	const totalDuration = actsWithDuration.reduce(
		(acc, act) => acc + dayjs.duration(act.duration).asMinutes(),
		0,
	);
	return dayjs
		.duration(Math.round(totalDuration / actsWithDuration.length), "minutes")
		.toISOString();
}
