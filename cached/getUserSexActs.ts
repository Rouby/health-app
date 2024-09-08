import { SexAct } from "@/data/sexActs";
import { getAbility } from "@/lib/ability";
import { logger } from "@/lib/logger";
import dayjs from "dayjs";
import { unstable_cache } from "next/cache";
import type { UUID } from "node:crypto";

export const getUserSexActs = unstable_cache(
	async (userId: UUID) => {
		const ability = getAbility(userId);
		const firstDayOfWeek = 1; //getUser.firstDayOfWeek;

		logger.info({ userId }, "Retrieve sex acts");

		return (await SexAct.filter((act) => ability.can("read", act)))
			.sort((a, b) => dayjs(a.dateTime).diff(dayjs(b.dateTime)))
			.map((d) => d.toJSON());
	},
	[],
	{ tags: ["sexActs"], revalidate: 3600 },
);
