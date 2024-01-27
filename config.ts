export const contractID = "0xe9738b2a0EC248a0dbbB73685ED2ce5E67FF37b7";
export const contractABI = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "electionId",
				type: "uint256",
			},
			{
				components: [
					{
						internalType: "uint256",
						name: "option",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "name",
						type: "string",
					},
					{
						internalType: "string",
						name: "description",
						type: "string",
					},
					{
						internalType: "bool",
						name: "exists",
						type: "bool",
					},
					{
						internalType: "uint256",
						name: "votes",
						type: "uint256",
					},
				],
				indexed: false,
				internalType: "struct Party[]",
				name: "leaderboard",
				type: "tuple[]",
			},
		],
		name: "LeaderBoardUpdate",
		type: "event",
	},
	{
		inputs: [],
		name: "electionCount",
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
				name: "",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "electionParties",
		outputs: [
			{
				internalType: "uint256",
				name: "option",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				internalType: "string",
				name: "description",
				type: "string",
			},
			{
				internalType: "bool",
				name: "exists",
				type: "bool",
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
	{
		inputs: [],
		name: "getAllActiveElections",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "electionId",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "name",
						type: "string",
					},
					{
						internalType: "string",
						name: "description",
						type: "string",
					},
					{
						internalType: "bool",
						name: "exists",
						type: "bool",
					},
					{
						internalType: "address",
						name: "creator",
						type: "address",
					},
				],
				internalType: "struct Election[]",
				name: "",
				type: "tuple[]",
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
		name: "getElectionStatus",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "option",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "name",
						type: "string",
					},
					{
						internalType: "string",
						name: "description",
						type: "string",
					},
					{
						internalType: "bool",
						name: "exists",
						type: "bool",
					},
					{
						internalType: "uint256",
						name: "votes",
						type: "uint256",
					},
				],
				internalType: "struct Party[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getElectionsByUser",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "electionId",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "name",
						type: "string",
					},
					{
						internalType: "string",
						name: "description",
						type: "string",
					},
					{
						internalType: "bool",
						name: "exists",
						type: "bool",
					},
					{
						internalType: "address",
						name: "creator",
						type: "address",
					},
				],
				internalType: "struct Election[]",
				name: "",
				type: "tuple[]",
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
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				internalType: "string",
				name: "description",
				type: "string",
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
				internalType: "address",
				name: "",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "voterElectionMap",
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
];
export const PORT_CLIENT = 3000;
export const PORT_SERVER = 8000;
export const ENV: "DEV" | "PROD" = "DEV";
export const BACKEND_URL =
	ENV === "DEV" ? `http://localhost:${PORT_SERVER}` : "";
export const FRONTEND_URL =
	ENV === "DEV" ? `http://localhost:${PORT_CLIENT}` : "";