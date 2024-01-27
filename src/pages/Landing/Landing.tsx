import { Button, Center, Text } from "@mantine/core";

const Landing = () => {
	return (
		<Center className="h-full w-full flex flex-col bg-gradient-to-t from-green-400 via-transparent to-orange-400 justify-center">
			<Text className="text-6xl mt-20 font-semibold tracking-wider text-center">
				ALL VOTE MATTERS
			</Text>
			<Text className="text-[6.25rem] leading-[0.9] bg-clip-text text-transparent font-bold text-center bg-gradient-to-r from-orange-500 to-orange-400">
				YOURS TOO!
			</Text>
			<Button
				size="xl"
				variant="gradient"
				gradient={{ from: "orange", to: "yellow", deg: 90 }}
				classNames={{
					root: "rounded-lg mt-20",
					label: "text-white",
				}}
			>
				LOGIN
			</Button>
		</Center>
	);
};

export default Landing;
