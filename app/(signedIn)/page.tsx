import { WeeklyStats } from "@/features/WeeklyStats";
import { verifySession } from "@/lib/ability";
import { Suspense } from "react";

export default async function DashboardPage() {
	await verifySession();

	return (
		<>
			<Suspense fallback="Loading weekly...">
				<WeeklyStats />
			</Suspense>
		</>
	);
}
