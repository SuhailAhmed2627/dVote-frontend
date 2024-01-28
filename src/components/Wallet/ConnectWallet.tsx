import { BrowserProvider } from "ethers";
import {
	getElectionParties,
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
		// 		"Vignes",
		// 		"Ur mom",
		// 		["0x9c26306E0eA2969321efFeA97759f13e8edD2146"],
		// 		["Ramesh", "Nagesh", "Nagesh's GF", "Panama canal"],
		// 		"now+100",
		// 		"now+4000"
		// 	)
		// );
		//console.log(await registerTicket(signer, "5", "12345678910", "1"));
		// console.log(await getTickets(signer, "6"));
		console.log(await voteWithTicket(signer, "5", "12345678910", "1"));
		// console.log(await getElectionsByUser(signer));
		// console.log(await getElectionParties(signer, "0"));
	}
	return <div onClick={getAccount}>ConnectWallet</div>;
};

export default ConnectWallet;
