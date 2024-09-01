import { AbilityBuilder, MongoAbility } from "@casl/ability";
import { createPrismaAbility } from "@casl/prisma";
import { DayWithoutSex } from "./data/daysWithoutSex";
import { SexAct } from "./data/sexActs";
import { User } from "./data/users";

type AppAbility = MongoAbility<
  [string, User | "User" | SexAct | "SexAct" | DayWithoutSex | "DayWithoutSex"]
>;

export async function createAbility(user: User | null) {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createPrismaAbility
  );

  if (user) {
    can("manage", "User", { id: user.id });
    can("manage", "SexAct", { userId: user.id });
    can("manage", "DayWithoutSex", { userId: user.id });
  }

  return build();
}
