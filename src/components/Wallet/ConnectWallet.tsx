import { BrowserProvider } from "ethers";
import {
	getElectionsByUser,
	getTickets,
	registerElection,
	registerTicket,
	voteWithTicket,
} from "../../blockchain/api";

const ConnectWallet = () => {
	async function getAccount() {
		if (!window.ethereum) return alert("Please install metamask");
		const provider = new BrowserProvider(window.ethereum);
		// It will prompt user for account connections if it isnt connected
		await provider.send("eth_requestAccounts", []);
		const signer = await provider.getSigner();
		console.log("Account:", await signer.getAddress());
		const network = await provider.getNetwork();
		if (Number(network.chainId) !== 323) {
			window.ethereum.request({
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
		}

		// console.log(
		// 	await registerElection(
		// 		signer,
		// 		"10",
		// 		"Nagessdasdh",
		// 		"Nageshasdasd's GF Selection",
		// 		["0x9c26306E0eA2969321efFeA97759f13e8edD2146"],
		// 		1706376050,
		// 		1706377300
		// 	)
		// );
		// console.log(await registerTicket(signer, "10", "0", "0"));
		// console.log(await getTickets(signer, "4"));
		console.log(await voteWithTicket(signer, "10", "0", "0"));
	}
	return <div onClick={getAccount}>ConnectWallet</div>;
};

export default ConnectWallet;
