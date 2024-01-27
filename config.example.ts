export const contractID = "0x1DC083533459C3fb20859175746ED148fE87ef84";
export const contractABI = [
	{
		inputs: [
			{
				internalType: "uint256",
				name: "electionId",
				type: "uint256",
			},
		],
		name: "getTickets",
		outputs: [
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "electionId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_merkleRoot",
				type: "uint256",
			},
		],
		name: "getWinner",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "electionId",
				type: "uint256",
			},
			{
				internalType: "address[]",
				name: "_voters",
				type: "address[]",
			},
			{
				internalType: "uint256",
				name: "start",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "end",
				type: "uint256",
			},
		],
		name: "registerElection",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "electionId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "ticket",
				type: "uint256",
			},
		],
		name: "registerTicket",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "electionId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "merkleRoot",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "option",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "serial",
				type: "uint256",
			},
			{
				internalType: "bytes",
				name: "proof",
				type: "bytes",
			},
		],
		name: "spendTicket",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "tickets",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes",
				name: "proof",
				type: "bytes",
			},
			{
				internalType: "uint256[]",
				name: "pubSignals",
				type: "uint256[]",
			},
		],
		name: "verifyProof",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "option",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "serial",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "root",
				type: "uint256",
			},
			{
				internalType: "bytes",
				name: "proof",
				type: "bytes",
			},
		],
		name: "verifyTicketSpending",
		outputs: [
			{
				internalType: "bool",
				name: "ret",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "voters",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "winner",
		outputs: [
			{
				internalType: "uint256",
				name: "option",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "votes",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];
export const ADMIN_PANEL_URL = "c3BpZGVyaXNnYXk";
export const PORT_CLIENT = 3000;
export const PORT_SERVER = 8000;
export const ENV: "DEV" | "PROD" = "DEV";
export const BACKEND_URL =
	ENV === "DEV" ? `http://localhost:${PORT_SERVER}` : "";
export const FRONTEND_URL =
	ENV === "DEV" ? `http://localhost:${PORT_CLIENT}` : "";
