import { StatCharts } from "@/features/StatCharts";
import { WeeklyStats } from "@/features/WeeklyStats";
import { verifySession } from "@/lib/ability";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardPage() {
	await verifySession();

	return (
		<>
			<Suspense fallback="Loading weekly...">
				<WeeklyStats />
			</Suspense>
			<Suspense fallback="Loading charts...">
				<StatCharts />
			</Suspense>
		</>
	);
}
