export const contractID = "0x8F52A850EeE20A29c447DD8EF1c6dD066452e899";
export const PORT_CLIENT = 3000;
export const PORT_SERVER = 3001;
export const ENV: "DEV" | "PROD" = "DEV";
export const BACKEND_URL =
	ENV === "DEV" ? `http://localhost:${PORT_SERVER}` : "";
export const FRONTEND_URL =
	ENV === "DEV" ? `http://localhost:${PORT_CLIENT}` : "";
export const ADMIN_PANEL_URL = "/admin";
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
		inputs: [
			{
				internalType: "uint256",
				name: "electionId",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "moderator",
				type: "address",
			},
		],
		name: "addModerator",
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
				internalType: "address",
				name: "voter",
				type: "address",
			},
		],
		name: "addVoter",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
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
		name: "electionModerators",
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
		],
		name: "getElectionParties",
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
				internalType: "string[]",
				name: "_parties",
				type: "string[]",
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
				internalType: "address",
				name: "moderator",
				type: "address",
			},
		],
		name: "removeModerator",
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
