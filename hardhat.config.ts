import dotenv from "dotenv";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-truffle5";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-web3";
import "@nomicfoundation/hardhat-ethers";
import { _deployContract } from "./src/blockchain/api";

dotenv.config();
const accounts = process.env.PRIVATE_KEYS?.split(",");

task("deploy", "Deploy a contract").setAction(async (_, { ethers }) => {
	const contract = await _deployContract(ethers, "AnonymousVoting");
	console.log(`contract address: ${contract.target}`);
});

const config: HardhatUserConfig = {
	solidity: {
		version: "0.8.9",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
	mocha: {
		timeout: 100000000,
	},
	networks: {
		cosvm: {
			url: "https://rpc.cosvm.net",
			accounts: accounts,
			chainId: 323,
		},
		celo: {
			url: "https://alfajores-forno.celo-testnet.org",
			accounts: accounts,
			chainId: 44787,
		},
	},
};

export default config;
