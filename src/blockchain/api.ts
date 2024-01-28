import { Contract, JsonRpcSigner } from "ethers";
import { MerkleTree } from "./merkleTree";
import { postreidon } from "./poseidon/poseidon";
import { contractID, contractABI } from "../../config";
import { dataFetch } from "../utils/helpers";

const TREE_DEPTH = 21;

export function _getMerkleTree(tickets: string[]) {
	const merkleTree = new MerkleTree(TREE_DEPTH);
	tickets.map((x) => merkleTree.addElement(x));
	return merkleTree;
}

export async function _deployContract(ethers: any, name: string) {
	const AnonymousVoting = await ethers.deployContract(name);
	return AnonymousVoting;
}

export async function registerElection(
	signer: JsonRpcSigner,
	electionName: string,
	description: string,
	voters: string[],
	parties: string[],
	startVotingTime: string | number,
	endVotingTime: string | number
) {
	const now = Math.floor(Date.now() / 1000);
	if (String(startVotingTime).startsWith("now+"))
		startVotingTime = now + Number(String(startVotingTime).slice(4));
	if (String(endVotingTime).startsWith("now+"))
		endVotingTime = now + Number(String(endVotingTime).slice(4));
	const anonymousVoting = new Contract(contractID, contractABI, signer);
	await anonymousVoting.registerElection(
		electionName,
		description,
		voters,
		parties,
		startVotingTime,
		endVotingTime
	);
}

export async function registerTicket(
	signer: JsonRpcSigner,
	electionId: string,
	secret: string,
	option: string
) {
	const ticket = postreidon([secret, option]);
	const serial = postreidon([secret, ticket]);
	const anonymousVoting = new Contract(contractID, contractABI, signer);
	await anonymousVoting.registerTicket(electionId, ticket);
	return {
		secret: secret.toString(),
		ticket: ticket,
		serial: serial,
	};
}

export async function addModerator(
	signer: JsonRpcSigner,
	electionId: string,
	moderatorID: string
) {
	const anonymousVoting = new Contract(contractID, contractABI, signer);
	await anonymousVoting.addModerator(electionId, moderatorID);
}

export async function removeModerator(
	signer: JsonRpcSigner,
	electionId: string,
	moderatorID: string
) {
	const anonymousVoting = new Contract(contractID, contractABI, signer);
	await anonymousVoting.removeModerator(electionId, moderatorID);
}

export async function addVoter(
	signer: JsonRpcSigner,
	electionId: string,
	voterID: string
) {
	const anonymousVoting = new Contract(contractID, contractABI, signer);
	await anonymousVoting.addVoter(electionId, voterID);
}

export async function voteWithTicket(
	signer: JsonRpcSigner,
	electionId: string,
	secret: string,
	option: string
) {
	// get ticket and serial
	const ticket: string = postreidon([secret, option]);
	const serial: string = postreidon([secret, ticket]);

	// get tickets from the smart contract
	const tickets: string[] = await getTickets(signer, electionId);

	// get Merkle proof and Merkle root of ticket array
	const index = tickets.indexOf(ticket);
	if (index === -1) throw new Error("Ticket not found");
	const merkleTree = _getMerkleTree(tickets);
	const merkleRoot = merkleTree.root();
	const merkleProof = merkleTree.proof(index);

	const proofResponse = await dataFetch({
		url: "/verifyProof",
		method: "POST",
		body: {
			merkleProof: merkleProof,
			secret: secret,
			option: option,
			merkleRoot: merkleRoot,
			ticket: ticket,
			serial: serial,
		},
	});
	const solProof: { proof: string } = await proofResponse.json();
	// call the contract to spend the ticket
	const anonymousVoting = new Contract(contractID, contractABI, signer);
	await anonymousVoting.spendTicket(
		electionId,
		merkleRoot,
		option,
		serial,
		solProof.proof
	);

	return {
		merkleRoot: merkleRoot,
	};
}

export async function getElectionStatus(
	signer: JsonRpcSigner,
	electionId: string
) {
	const merkleRoot = await _getMerkleRoot(electionId, signer);
	const anonymousVoting = new Contract(contractID, contractABI, signer);
	return anonymousVoting.getElectionStatus(electionId, merkleRoot);
}

export async function getVotingHistoryByParty(
	signer: JsonRpcSigner,
	electionId: string,
	party: string
) {
	const anonymousVoting = new Contract(contractID, contractABI, signer);
	const history = await anonymousVoting.getVotingHistoryByParty(
		electionId,
		party
	);
	return history.map((x: JSON) => x.toString());
}

export async function getTickets(
	signer: JsonRpcSigner,
	electionId: string
): Promise<string[]> {
	const anonymousVoting = new Contract(contractID, contractABI, signer);
	// Its int in old repo
	const tickets = await anonymousVoting.getTickets(electionId);
	return tickets.map((x: JSON) => x.toString());
}

export async function _getMerkleRoot(
	electionId: string,
	signer: JsonRpcSigner
) {
	const tickets = await getTickets(signer, electionId);
	const merkleTree = _getMerkleTree(tickets);
	return merkleTree.root();
}

export async function getElectionsByUser(signer: JsonRpcSigner) {
	const anonymousVoting = new Contract(contractID, contractABI, signer);
	const elections = await anonymousVoting.getElectionsByUser();
	return elections.map((x: JSON) => x.toString());
}

export async function getAllActiveElections(signer: JsonRpcSigner) {
	const anonymousVoting = new Contract(contractID, contractABI, signer);
	const elections = await anonymousVoting.getAllActiveElections();
	return elections.map((x: JSON) => x.toString());
}

export async function getElectionParties(
	signer: JsonRpcSigner,
	electionId: string
) {
	const anonymousVoting = new Contract(contractID, contractABI, signer);
	const parties = await anonymousVoting.getElectionParties(electionId);
	return parties.map((x: JSON) => x.toString());
}
