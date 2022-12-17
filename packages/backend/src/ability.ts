import { AbilityBuilder, PureAbility } from "@casl/ability";
import { createPrismaAbility, PrismaQuery, Subjects } from "@casl/prisma";
import { DayWithoutSex, SexAct, User } from "@prisma/client";

type AppAbility = PureAbility<
  [
    string,
    Subjects<{
      User: User;
      SexAct: SexAct;
      DayWithoutSex: DayWithoutSex;
    }>
  ],
  PrismaQuery
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
