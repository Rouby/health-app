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
import { cache } from "react";
import { decrypt } from "./session";

type AppAbility = MongoAbility<
	[string, User | "User" | SexAct | "SexAct" | DayWithoutSex | "DayWithoutSex"]
>;

export const getAbility = cache(async () => {
	const cookie = cookies().get("session")?.value;
	const session = (await decrypt(cookie)) as SessionPayload;

	const { can, cannot, build } = new AbilityBuilder<AppAbility>(
		createMongoAbility,
	);

	if (session) {
		can("manage", "User", { id: session.userId });
		can("manage", "SexAct", { userId: session.userId });
		can("manage", "DayWithoutSex", { userId: session.userId });
	}

	return build();
});

export const verifySession = cache(async () => {
	const cookie = cookies().get("session")?.value;
	const session = await decrypt(cookie);

	if (!session?.userId) {
		redirect("/login");
	}

	return { isAuth: true, userId: session.userId as User["id"] };
});
