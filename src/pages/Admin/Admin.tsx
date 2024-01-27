import { Button, Center, Group, Text, TextInput } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { showNotification } from "../../utils/helpers";
import { BrowserProvider, ethers, randomBytes } from "ethers";
import { registerElection } from "../../blockchain/api";
import { DateInput } from "@mantine/dates";

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
	const [isConnected, setIsConnected] = useState(false);
	const [startDate, setStartDate] = useState<null | Date>(new Date());
	const [endDate, setEndDate] = useState<null | Date>(new Date());

	const createElection = useCallback(async () => {
		if (!window.ethereum) return alert("Please install metamask");
		const provider = new BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		// registerElection(
		// 	signer,
		// 	nameOfElection,
		// 	descriptionOfElection,
		// 	candidates,
		// 	startDate,
		// 	endDate
		// );
		showNotification("Success", "Election created", "success");
	}, [nameOfElection, descriptionOfElection, candidates, numberOfCandidates]);

	async function connect() {
		if (!window.ethereum) return alert("Please install metamask");
		const provider = new BrowserProvider(window.ethereum);
		// It will prompt user for account connections if it isnt connected
		await provider.send("eth_requestAccounts", []);
		const signer = await provider.getSigner();
		if (!signer) {
			return;
		}
		const network = await provider.getNetwork();
		if (Number(network.chainId) !== 323) {
			try {
				await window.ethereum.request({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: "0x143",
							rpcUrls: ["https://rpc.cosvm.net"],
							chainName: "CosVM Mainnet",
							nativeCurrency: {
								name: "CVM",
								symbol: "CVM",
								decimals: 18,
							},
							blockExplorerUrls: ["https://explorer.cosvm.net/"],
						},
					],
				});
			} catch (error) {
				showNotification("Error", "Unable to connect", "error");
			}
			return;
		}
		setIsConnected(true);
		showNotification("Success", "Connected to CosVM", "success");
	}

	if (!isConnected) {
		return (
			<div className="h-screen w-screen flex flex-col justify-center items-center">
				<div className="text-2xl font-bold">
					<Button
						variant="gradient"
						gradient={{ from: "orange", to: "red" }}
						classNames={{
							label: "text-white",
						}}
						onClick={async () => {
							await connect();
						}}
					>
						Connect to CosVM
					</Button>
				</div>
			</div>
		);
	}

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
						<DateInput
							label="Start Date"
							value={startDate}
							onChange={(date) => setStartDate(date)}
						/>
						<DateInput
							label="End Date"
							value={endDate}
							onChange={setEndDate}
						/>
					</Group>
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
							createElection();
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
