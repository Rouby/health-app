import { DayWithoutSex } from "@/data/daysWithoutSex";
import { getAbility } from "@/lib/ability";
import { logger } from "@/lib/logger";
import dayjs from "dayjs";
import { unstable_cache } from "next/cache";
import type { UUID } from "node:crypto";

export const getUserDaysWithoutSex = unstable_cache(
	async (userId: UUID) => {
		const ability = getAbility(userId);

		const daysWithoutSex = await DayWithoutSex.filter((dayWithoutSex) =>
			ability.can("read", dayWithoutSex),
		);

		logger.info({ daysWithoutSex }, "Retrieved days without sex");

		return daysWithoutSex
			.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))
			.map((d) => d.toJSON());
	},
	[],
	{ tags: ["daysWithoutSex"], revalidate: 3600 },
);
