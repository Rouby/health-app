import { SexTimeline } from "@/features/SexTimeline";
import { TrackSex } from "@/features/TrackSex";
import { verifySession } from "@/lib/ability";
import { Suspense } from "react";

export default async function TrackingPage() {
	await verifySession();

	return (
		<>
			<Suspense fallback="Loading tracking...">
				<TrackSex />
			</Suspense>

			<Suspense fallback="Loading tracking...">
				<SexTimeline />
			</Suspense>
		</>
	);
}
