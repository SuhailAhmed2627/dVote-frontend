import {
	Table,
	Group,
	Avatar,
	Text,
	Button,
	Center,
	Container,
} from "@mantine/core";
import { useMutation, useQueries, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getUser, showNotification } from "../../utils/helpers";
import {
	getElectionParties,
	getElectionsByUser,
	registerTicket,
	voteWithTicket,
} from "../../blockchain/api";
import { JsonRpcSigner } from "ethers";
import { useState } from "react";

// const electionsDetails = {
// 	id: "1",
// 	name: "Election 1",
// 	votedAlready: true,
// 	description:
// 		"This is the first election. This is a long description, so it will wrap around. Some more text to make it wrap around again.",
// 	candidates: [
// 		{
// 			id: "1",
// 			name: "Candidate 1",
// 			logoUrl:
// 				"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png",
// 		},
// 		{
// 			id: "2",
// 			name: "Candidate 2",
// 			logoUrl:
// 				"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png",
// 		},
// 		{
// 			id: "3",
// 			name: "Candidate 3",
// 			logoUrl:
// 				"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
// 		},
// 	],
// };

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

const getLogoUrl = () => {
	const urls = [
		"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png",
		"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png",
		"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
	];
	return urls[Math.floor(Math.random() * urls.length)];
};

const processCandData = (data: string[]) => {
	const splitData = data.map((a) => a.split(","));

	const newData = splitData.map((a) => {
		return {
			name: a[1],
			id: a[0],
			logoUrl: getLogoUrl(),
		};
	});

	return newData;
};

const makeid = (length: number) => {
	let result = "";
	const characters = "0123456789";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

const vote = async (
	electionId: string,
	candidateId: string,
	user: JsonRpcSigner
) => {
	const secret = makeid(16);
	const ticketRes = await registerTicket(
		user,
		electionId,
		secret,
		candidateId
	);
	const voteRes = await voteWithTicket(user, electionId, secret, candidateId);
	console.log(ticketRes, voteRes);
};

const Election = () => {
	const { electionId } = useParams();
	const [voted, setVoted] = useState(false);
	const user = getUser();
	const [isLoading, setIsLoading] = useState(false);
	const [getElectionDetailsQuery, getElectionPartiesQuery] = useQueries([
		{
			queryKey: ["electionDetail", electionId],
			queryFn: async () => {
				if (!user) return;
				const elections = await getElectionsByUser(user);
				const election = processElectionData(elections).find(
					(election) => election.id === electionId
				);
				console.log(election);
				return election;
			},
		},
		{
			queryKey: ["electionParties", electionId],
			queryFn: async () => {
				if (!user) return;
				const parties = await getElectionParties(
					user,
					electionId as string
				);
				const s = processCandData(parties);
				console.log(s);
				return s;
			},
		},
	]);
	const voteMutation = useMutation({
		mutationFn: async ({
			electionId,
			candidateId,
			user,
		}: {
			electionId: string;
			candidateId: string;
			user: JsonRpcSigner;
		}) => {
			const secret = makeid(20);
			console.log(secret, candidateId);
			const ticketRes = await registerTicket(
				user,
				electionId,
				secret,
				candidateId
			);
			if (!ticketRes) {
				showNotification("Error", "You have Voted earlier", "error");
				setIsLoading(false);
				setVoted(true);
				return;
			}
			showNotification("Ticket", "Ticket registered", "info");
			setTimeout(async () => {
				const voteRes = await voteWithTicket(
					user,
					electionId,
					"06200267391764307219",
					candidateId
				);
				if (voteRes) {
					setVoted(true);
					showNotification("Success", "Voted successfully", "success");
				} else {
					showNotification("Error", "Unable to vote", "error");
				}
				setIsLoading(false);
			}, 10000);
		},
	});

	if (!electionId) {
		return <div>No election id provided</div>;
	}

	if (getElectionDetailsQuery.isLoading || getElectionPartiesQuery.isLoading) {
		return (
			<Center className="h-full w-full flex flex-col justify-center items-center gap-10">
				<Text className="text-2xl font-semibold">Loading...</Text>
			</Center>
		);
	}

	if (getElectionDetailsQuery.isError || getElectionPartiesQuery.isError) {
		return <div>Error</div>;
	}

	if (!getElectionDetailsQuery.data || !getElectionPartiesQuery.data) {
		return <div>No data</div>;
	}

	const rows = getElectionPartiesQuery.data.map((item) => (
		<Table.Tr
			className="unset-border border-s border-b border-b-slate-400 hover:bg-orange-50"
			key={item.name}
		>
			<Table.Td>
				<Group gap="sm">
					<Avatar size={40} src={item.logoUrl} radius={40} />
					<div>
						<Text>{item.name}</Text>
					</div>
				</Group>
			</Table.Td>
			<Table.Td align="right">
				<Button
					loading={isLoading}
					disabled={isLoading}
					onClick={() => {
						setIsLoading(true);
						voteMutation.mutate({
							electionId: electionId,
							candidateId: item.id,
							user: user,
						});
					}}
					color="orange"
					variant="light"
				>
					Vote
				</Button>
			</Table.Td>
		</Table.Tr>
	));

	return (
		<Center className="h-full w-full flex flex-col justify-center items-center gap-10">
			<Container className="w-[90%] md:w-[40%] ">
				<Text className="text-2xl font-semibold">
					{getElectionDetailsQuery.data.name}
				</Text>
				<Text className="text-sm mt-2 pr-10">
					{getElectionDetailsQuery.data.description}
				</Text>
				{voted ? (
					<Text className="text-lg font-semibold my-10 pr-10 text-center">
						You have already voted in this election.
					</Text>
				) : (
					<Table verticalSpacing="sm" className="w-full mt-8">
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Candidates</Table.Th>
								<Table.Th></Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>{rows}</Table.Tbody>
					</Table>
				)}
			</Container>
		</Center>
	);
};

export default Election;
