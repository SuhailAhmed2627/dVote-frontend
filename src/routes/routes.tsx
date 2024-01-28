import React from "react";
import "./types.d";
import {
	Landing,
	Home,
	Elections,
	Stats,
	Profile,
	Election,
	Admin,
} from "../pages";
import { Navigate, Route } from "react-router-dom";
import { ADMIN_PANEL_URL } from "../../config";

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
	{
		path: `/${ADMIN_PANEL_URL}`,
		element: <LazyRouteElement element={<Admin />} />,
		title: "Admin Panel",
		description: "Admin Panel of App",
	},
];
