import React from "react";
import "./types.d";
import { Landing, Signup, Login, Home } from "../pages";

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
		path: "/login",
		element: <Login />,
		title: "Login",
		description: "Login Page of App",
	},
	{
		path: "/signup",
		element: <Signup />,
		title: "Signup",
		description: "Signup Page of App",
	},
	{
		path: "/home",
		element: <Home />,
		title: "Home",
		description: "Home Page of App",
	},
];
