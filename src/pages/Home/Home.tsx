import { NavLink, Outlet } from "react-router-dom";
import { AppShell, Button, Center, Text } from "@mantine/core";
import { IconChartBar, IconHome, IconUserCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { showNotification } from "../../utils/helpers";

const Home = () => {
	const [isConnected, setIsConnected] = useState(false);

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
		<AppShell
			header={{ height: 60 }}
			footer={{
				height: 100,
			}}
		>
			<AppShell.Header className="bg-white shadow-sm border-b border-gray-200">
				<div>dVote</div>
			</AppShell.Header>

			<AppShell.Main className="h-[100dvh]">
				<Outlet />
			</AppShell.Main>

			<AppShell.Footer className="bg-white box-up border-t border-gray-200">
				<Center className="h-full w-full flex flex-row justify-center items-center gap-10">
					<NavLink
						to="/home/elections"
						className={({ isActive }) => {
							return isActive
								? "[&>svg>path]:text-orange-600 flex flex-col justify-center items-center w-[100px] h-[100px] rounded-2xl bg-orange-50"
								: "[&>svg>path]:text-gray-600 flex flex-col justify-center items-center w-[100px] h-[100px]";
						}}
					>
						<IconHome size={40} />
						<Text className="text-sm mt-2 text-gray-500">Elections</Text>
					</NavLink>
					<NavLink
						to="/home/stats"
						className={({ isActive }) => {
							return isActive
								? "[&>svg>path]:text-orange-600 flex flex-col justify-center items-center w-[100px] h-[100px] rounded-2xl bg-orange-50"
								: "[&>svg>path]:text-gray-600 flex flex-col justify-center items-center w-[100px] h-[100px]";
						}}
					>
						<IconChartBar size={40} />
						<Text className="text-sm mt-2 text-gray-500">Statistics</Text>
					</NavLink>
					<NavLink
						to="/home/profile"
						className={({ isActive }) => {
							return isActive
								? "[&>svg>path]:text-orange-600 flex flex-col justify-center items-center w-[100px] h-[100px] rounded-2xl bg-orange-50"
								: "[&>svg>path]:text-gray-600 flex flex-col justify-center items-center w-[100px] h-[100px]";
						}}
					>
						<IconUserCircle size={40} />
						<Text className="text-sm mt-2 text-gray-500">Profile</Text>
					</NavLink>
				</Center>
			</AppShell.Footer>
		</AppShell>
	);
};

export default Home;
