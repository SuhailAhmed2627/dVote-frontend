import dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-truffle5";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-web3";
import "hardhat-gas-reporter";

const accounts = process.env.PRIVATE_KEYS?.split(",");
dotenv.config();

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
