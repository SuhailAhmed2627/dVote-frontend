import React from "react";
import "./types.d";
import { Landing, Home, Elections, Stats, Profile, Election } from "../pages";
import { Navigate, Route, Routes } from "react-router-dom";

const SuspenseFallback = () => {
	return <div>Loading...</div>;
};

const LazyRouteElement = (props: { element: JSX.Element }) => {
	return (
		<React.Suspense fallback={<SuspenseFallback />}>
			{props.element}
		</React.Suspense>
	);
};

export const routes: RouteType[] = [
	{
		path: "/",
		element: <Landing />,
		title: "Welcome",
		description: "Landing Page of App",
	},
	{
		path: "/home",
		element: <Home />,
		title: "Home",
		description: "Home Page of App",
		children: (
			<>
				<Route path="/home" element={<Navigate to="/home/elections" />} />
				<Route path="/home/elections" element={<Elections />} />
				<Route path="/home/elections/:electionId" element={<Election />} />
				<Route path="/home/stats" element={<Stats />} />
				<Route path="/home/profile" element={<Profile />} />
			</>
		),
	},
];
