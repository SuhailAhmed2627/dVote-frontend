import { Button, Center, Group, Text, TextInput } from "@mantine/core";
import { useState } from "react";

const Admin = () => {
	const [nameOfElection, setNameOfElection] = useState("");
	const [descriptionOfElection, setDescriptionOfElection] = useState("");
	const [candidates, setCandidates] = useState<
		{
			name: string;
			logoUrl: string;
		}[]
	>([]);
	const [voters, setVoters] = useState<string[]>([]);
	const [numberOfCandidates, setNumberOfCandidates] = useState(1);

	return (
		<>
			<Center className="h-full w-full flex flex-col justify-center items-center gap-10">
				<Text className="text-2xl font-semibold">Admin Panel</Text>
				<Center className="flex w-full flex-col gap-4">
					<TextInput
						label="Name of Election"
						value={nameOfElection}
						withAsterisk
						onChange={(event) =>
							setNameOfElection(event.currentTarget.value)
						}
					/>
					<TextInput
						label="Description of Election"
						value={descriptionOfElection}
						withAsterisk
						onChange={(event) =>
							setDescriptionOfElection(event.currentTarget.value)
						}
					/>
					<Group>
						{Array.from({ length: numberOfCandidates }, (_, index) => (
							<Center key={index} className="flex flex-col gap-4">
								<TextInput
									label={`Candidate ${index + 1}`}
									value={candidates[index]?.name}
									onChange={(event) => {
										const newCandidates = [...candidates];
										newCandidates[index] = {
											...newCandidates[index],
											name: event.currentTarget.value,
										};
										setCandidates(newCandidates);
									}}
								/>
								<TextInput
									label={`Logo Url of Candidate ${index + 1}`}
									value={candidates[index]?.logoUrl}
									onChange={(event) => {
										const newCandidates = [...candidates];
										newCandidates[index] = {
											...newCandidates[index],
											logoUrl: event.currentTarget.value,
										};
										setCandidates(newCandidates);
									}}
								/>
							</Center>
						))}
					</Group>
					<Group>
						<Button
							variant="gradient"
							gradient={{ from: "orange", to: "red" }}
							classNames={{
								label: "text-white",
							}}
							onClick={() => {
								setNumberOfCandidates(numberOfCandidates + 1);
							}}
						>
							+
						</Button>
						<Button
							variant="gradient"
							gradient={{ from: "orange", to: "red" }}
							classNames={{
								label: "text-white",
							}}
							onClick={() => {
								if (numberOfCandidates === 1) {
									return;
								}
								const newCandidates = [...candidates];
								newCandidates.pop();
								setCandidates(newCandidates);
								setNumberOfCandidates(numberOfCandidates - 1);
							}}
						>
							-
						</Button>
					</Group>
					<Button
						classNames={{
							label: "text-white",
						}}
						variant="gradient"
						gradient={{ from: "orange", to: "red" }}
						onClick={() => {
							// TODO: Create election
						}}
					>
						Create Election
					</Button>
				</Center>
			</Center>
			<Center className="h-full w-full flex flex-col justify-center items-center gap-10">
				<Text className="text-2xl font-semibold">Election Status</Text>
			</Center>
		</>
	);
};

export default Admin;
