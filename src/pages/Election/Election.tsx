import {
	Table,
	Group,
	Avatar,
	Text,
	Button,
	Center,
	Container,
} from "@mantine/core";
import { useParams } from "react-router-dom";

const electionsDetails = {
	id: "1",
	name: "Election 1",
	votedAlready: true,
	description:
		"This is the first election. This is a long description, so it will wrap around. Some more text to make it wrap around again.",
	candidates: [
		{
			id: "1",
			name: "Candidate 1",
			logoUrl:
				"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png",
		},
		{
			id: "2",
			name: "Candidate 2",
			logoUrl:
				"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png",
		},
		{
			id: "3",
			name: "Candidate 3",
			logoUrl:
				"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
		},
	],
};

const Election = () => {
	const { electionId } = useParams();

	if (!electionId) {
		return <div>No election id provided</div>;
	}

	const rows = electionsDetails.candidates.map((item) => (
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
				<Button color="orange" variant="light">
					Vote
				</Button>
			</Table.Td>
		</Table.Tr>
	));

	return (
		<Center className="h-full w-full flex flex-col justify-center items-center gap-10">
			<Container>
				<Text className="text-2xl font-semibold">
					{electionsDetails.name}
				</Text>
				<Text className="text-sm mt-2 pr-10">
					{electionsDetails.description}
				</Text>
				{electionsDetails.votedAlready ? (
					<Text className="text-lg font-semibold my-10 pr-10 text-center">
						You have already voted in this election.
					</Text>
				) : (
					<Table
						verticalSpacing="sm"
						className="w-full mt-8 min-w-[400px]"
					>
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
