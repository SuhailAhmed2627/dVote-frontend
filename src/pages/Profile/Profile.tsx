import { Card, Avatar, Text, Center } from "@mantine/core";
import classes from "./Profile.module.css";

export function UserCardImage() {
	return (
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
			<Text ta="center" fz="lg" fw={500} mt="sm">
				Bill Headbanger
			</Text>
			<Text ta="center" fz="sm" c="dimmed">
				Fullstack engineer
			</Text>
		</Card>
	);
}

const Profile = () => {
	return (
		<Center className="h-full w-full">
			<UserCardImage />
		</Center>
	);
};

export default Profile;
