import { SexAct } from "@/data/sexActs";
import { getAbility, verifySession } from "@/lib/ability";

export default async function Home() {
  await verifySession();

  const ability = await getAbility();

  const acts = await SexAct.filter((act) => ability.can("read", act));

  return (
    <>
      {acts.map((act) => (
        <div key={act.id}>{act.dateTime}</div>
      ))}
    </>
  );
}
