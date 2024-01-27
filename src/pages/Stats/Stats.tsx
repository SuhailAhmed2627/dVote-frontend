import { BarChart } from "@mantine/charts";
import { Center } from "@mantine/core";
import { use } from "chai";
import { useEffect, useState } from "react";

const data = [
	{
		candidate: "Sarvesh",
		votes: 100,
	},
	{
		candidate: "Suraj",
		votes: 200,
	},
	{
		candidate: "Vishal",
		votes: 300,
	},
	{
		candidate: "Rahul",
		votes: 400,
	},
	{
		candidate: "Rohit",
		votes: 500,
	},
	{
		candidate: "Suhail",
		votes: 700,
	},
];

const Stats = () => {
	const [current, setCurrent] = useState(data);

	useEffect(() => {
		const interval = setInterval(() => {
			const newData = [];

			for (const item of current) {
				newData.push({
					candidate: item.candidate,
					votes: item.votes + Math.floor(Math.random() * 100),
				});
			}

			setCurrent(newData);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<Center className="h-full w-full">
			<BarChart
				className="w-[500px] h-[400px]"
				data={current}
				dataKey="candidate"
				series={[
					{
						name: "votes",
						color: "orange.6",
					},
				]}
				tickLine="y"
			/>
		</Center>
	);
};

export default Stats;
