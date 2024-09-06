import { DayWithoutSex } from "@/data/daysWithoutSex";
import { getAbility } from "@/lib/ability";
import { logger } from "@/lib/logger";
import dayjs from "dayjs";
import { unstable_cache } from "next/cache";
import type { UUID } from "node:crypto";

export const getUserDaysWithoutSex = unstable_cache(
	async (userId: UUID) => {
		const ability = getAbility(userId);
		const firstDayOfWeek = 1; //getUser.firstDayOfWeek;

		logger.info({ userId }, "Retrieve days without sex");

		return (await DayWithoutSex.filter((d) => ability.can("read", d))).sort(
			(a, b) => dayjs(a.dateTime).diff(dayjs(b.dateTime)),
		);
	},
	[],
	{ tags: ["daysWithoutSex"] },
);
