import type { DayWithoutSex } from "@/data/daysWithoutSex";
import type { SexAct } from "@/data/sexActs";
import type { User } from "@/data/users";
import {
	AbilityBuilder,
	type MongoAbility,
	createMongoAbility,
} from "@casl/ability";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { UUID } from "node:crypto";
import { cache } from "react";
import { decrypt } from "./session";

type AppAbility = MongoAbility<
	[string, User | "User" | SexAct | "SexAct" | DayWithoutSex | "DayWithoutSex"]
>;

export const getAbility = (userId: UUID) => {
	const { can, cannot, build } = new AbilityBuilder<AppAbility>(
		createMongoAbility,
	);

	if (userId) {
		can("manage", "User", { id: userId });
		can("manage", "SexAct", { userId });
		can("manage", "DayWithoutSex", { userId });
	}

	return build({
		detectSubjectType(subject) {
			return subject.kind;
		},
	});
};

export const verifySession = cache(async () => {
	const cookie = cookies().get("session")?.value;
	const session = await decrypt(cookie);

	if (!session?.userId) {
		redirect("/login");
	}

	return { isAuth: true, userId: session.userId as User["id"] };
});
