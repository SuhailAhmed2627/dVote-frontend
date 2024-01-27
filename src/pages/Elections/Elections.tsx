import { Text, Center } from "@mantine/core";
import { IconRubberStamp } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const electionRes = [
	{
		name: "Election 1",
		id: "1",
		description:
			"This is the first election. This is a long description, so it will wrap around. Some more text to make it wrap around again.",
	},
	{
		name: "Election 2",
		id: "2",
		description:
			"This is the second election. This is a long description, so it will wrap around. Some more text to make it wrap around again.",
	},
	{
		name: "Election 3",
		id: "3",
		description:
			"This is the third election, and it is the last one. This is a long description, so it will wrap around. Some more text to make it wrap around again.",
	},
];

const Elections = () => {
	return (
		<Center className="h-full w-full flex flex-col justify-center items-center gap-10">
			{electionRes.map((election) => (
				<Center
					component={Link}
					to={`/home/elections/${election.id}`}
					key={election.id}
					className="max-w-[500px] shadow-lg rounded-lg gap-4 justify-between p-4 bg-gradient-to-br from-orange-500 to-orange-400"
				>
					<Center className="flex max-w-[400px] flex-col gap-0 items-start">
						<Text className="text-2xl text-white font-semibold text-center">
							{election.name}
						</Text>
						<Text lineClamp={2} className="text-white text-sm">
							{election.description}
						</Text>
					</Center>
					<IconRubberStamp className="[&>path]:text-white" size={48} />
				</Center>
			))}
		</Center>
	);
};

export default Elections;
