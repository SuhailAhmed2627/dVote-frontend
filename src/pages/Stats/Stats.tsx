import { BarChart } from "@mantine/charts";
import { Center, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { getElectionParties, getElectionsByUser } from "../../blockchain/api";
import { getUser } from "../../utils/helpers";
import { useQuery } from "react-query";

const processCandData = (data: string[]) => {
	const splitData = data.map((a) => a.split(","));

	const newData = splitData.map((a) => {
		return {
			candidate: a[1],
			votes: parseInt(a[3]),
		};
	});

	return newData;
};

const Stats = () => {
	const [current, setCurrent] = useState(null);
	const user = getUser();
	const [electionId, setElectionId] = useState<string | null>(null);

	const getElectionsQuery = useQuery({
		queryKey: "electionId",
		queryFn: async () => {
			const elections = await getElectionsByUser(user);
			const meow = elections.map((election: any) => {
				const electionArray = election.split(",");
				return {
					name: electionArray[1],
					id: electionArray[0],
				};
			});
			// Remove duplicates
			const unique = meow.filter(
				(v: any, i: any, a: any) =>
					a.findIndex((t: any) => t.id === v.id) === i
			);
			return unique;
		},
	});

	useEffect(() => {
		if (!user) return;
		if (!electionId) return;
		const getNew = async () => {
			const newData = await getElectionParties(user, electionId);
			setCurrent(processCandData(newData) as any);
		};
		getNew();
	}, [electionId]);

	if (getElectionsQuery.isLoading) {
		return <div>Loading...</div>;
	}

	if (getElectionsQuery.isError) {
		return <div>Error</div>;
	}

	if (!getElectionsQuery.data) {
		return <div>No data</div>;
	}

	return (
		<Center className="h-full w-full flex-col gap-10">
			<Select
				label="Select Election"
				className="w-[300px] md:w-[400px] "
				data={getElectionsQuery.data.map((a: any) => {
					return {
						label: a.name,
						value: a.id,
					};
				})}
				onChange={(value) => {
					setElectionId(value);
				}}
			/>
			{electionId && current && (
				<BarChart
					className="w-[300px] h-[225px] md:w-[400px] md:h-[300px]"
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
			)}
		</Center>
	);
};

export default Stats;
