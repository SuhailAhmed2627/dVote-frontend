import { Text, Center } from "@mantine/core";
import { IconRubberStamp } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { getAllActiveElections } from "../../blockchain/api";
import { getUser } from "../../utils/helpers";
import { useQuery } from "react-query";

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

const processElectionData = (data: string[]) => {
	const splitData = data.map((a) => a.split(","));

	const newData = splitData.map((a) => {
		return {
			id: a[0],
			name: a[1],
			description: a[2],
		};
	});

	return newData;
};

const Elections = () => {
	const user = getUser();
	const getElectionsQuery = useQuery({
		queryKey: "elections",
		queryFn: async () => {
			if (!user) return;
			const elections = await getAllActiveElections(user);
			const processed = processElectionData(elections);
			const filtered = processed.filter((election) => election.name !== "");
			return filtered;
		},
	});

	if (getElectionsQuery.isLoading) {
		return (
			<Center className="h-full w-full flex flex-col justify-center items-center gap-10">
				<Text className="text-2xl font-semibold">Loading...</Text>
			</Center>
		);
	}

	if (getElectionsQuery.isError) {
		return (
			<Center className="h-full w-full flex flex-col justify-center items-center gap-10">
				<Text className="text-2xl font-semibold">Error</Text>
			</Center>
		);
	}

	if (!getElectionsQuery.data) {
		return (
			<Center className="h-full w-full flex flex-col justify-center items-center gap-10">
				<Text className="text-2xl font-semibold">No data</Text>
			</Center>
		);
	}

	return (
		<Center className="h-full w-full">
			<Center className="w-[90%] md:w-[40%] flex flex-col justify-center items-stretch gap-10 pt-10 pb-10 overflow-y-auto">
				{getElectionsQuery.data.map((election) => (
					<Center
						component={Link}
						to={`/home/elections/${election.id}`}
						key={election.id}
						className=" shadow-lg rounded-lg gap-4 justify-between p-4 bg-gradient-to-br from-orange-500 to-orange-400"
					>
						<Center className="flex flex-col gap-0 w-[70%] items-start">
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
		</Center>
	);
};

export default Elections;
