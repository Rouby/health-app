import { StatCharts } from "./StatCharts";

export async function StatChartsServer() {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return <StatCharts />;
}
