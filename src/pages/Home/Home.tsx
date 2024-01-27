import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { getUser } from "../../utils/helpers";
import { AppShell, Center, Text } from "@mantine/core";
import {
	IconChartBar,
	IconHistory,
	IconHome,
	IconUserCircle,
} from "@tabler/icons-react";

const Home = () => {
	const user = getUser();
	const navigate = useNavigate();

	// if (!user) {
	// 	navigate("/login");
	// 	return null;
	// }

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
