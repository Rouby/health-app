"use client";

// import { PieChart } from "@mantine/charts";
import { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

// const PieChart = dynamic(
// 	() => import("@mantine/charts").then((d) => d.PieChart),
// 	{
// 		ssr: false,
// 	},
// );

export function StatCharts() {
	const [serverSide, setServerSide] = useState(true);
	useEffect(() => {
		console.log("helkl");
		setServerSide(false);
	}, []);
	// if (serverSide) return null;

	return (
		<>
			<ResponsiveContainer height={400}>
				<PieChart
					id="1"
					width={200}
					height={200}
					data={[
						{ name: "USA", value: 400, color: "indigo.6" },
						{ name: "India", value: 300, color: "yellow.6" },
						{ name: "Japan", value: 300, color: "teal.6" },
						{ name: "Other", value: 200, color: "gray.6" },
					]}
				>
					<Pie
						isAnimationActive={false}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						outerRadius={50}
						fill="#8884d8"
					/>
				</PieChart>
			</ResponsiveContainer>
		</>
	);
}
