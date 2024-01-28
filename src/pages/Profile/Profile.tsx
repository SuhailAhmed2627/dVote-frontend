import { Card, Avatar, Text, Center } from "@mantine/core";
import classes from "./Profile.module.css";
import { getUser } from "../../utils/helpers";
import { useQuery } from "react-query";

const Profile = () => {
	const user = getUser();
	const myAddressQuery = useQuery({
		queryKey: "myAddress",
		queryFn: async () => {
			if (!user) return;
			const myAddress = await user.getAddress();
			return myAddress;
		},
	});
	if (!user) {
		return (
			<div>
				<Text>Not logged in</Text>
			</div>
		);
	}

	if (myAddressQuery.isLoading) {
		return (
			<Center className="h-full w-full flex flex-col justify-center items-center gap-10">
				<Text className="text-2xl font-semibold">Loading...</Text>
			</Center>
		);
	}

	if (myAddressQuery.isError) {
		return (
			<Center className="h-full w-full flex flex-col justify-center items-center gap-10">
				<Text className="text-2xl font-semibold">Error</Text>
			</Center>
		);
	}

	if (!myAddressQuery.data) {
		return (
			<Center className="h-full w-full flex flex-col justify-center items-center gap-10">
				<Text className="text-2xl font-semibold">No data</Text>
			</Center>
		);
	}

	return (
		<Center className="h-full w-full px-4">
			<Card withBorder padding="xl" radius="md" className={classes.card}>
				<Card.Section
					h={100}
					className="bg-gradient-to-br from-orange-500 to-red-500"
				/>
				<Avatar
					src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
					size={80}
					radius={80}
					mx="auto"
					mt={-30}
					className={classes.avatar}
				/>
				<Text className="" ta="center" fz="lg" fw={500} mt="sm">
					{myAddressQuery.data}
				</Text>
				<Text ta="center" fz="sm" c="dimmed">
					Just a cool dude in the blockchain
				</Text>
			</Card>
		</Center>
	);
};

export default Profile;
