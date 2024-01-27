import { routes } from "./routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFoundPage } from "../pages";
import { MetaDecoratedPage } from "../components";
import { MetaMaskProvider } from "@metamask/sdk-react";

const Router = () => {
	return (
		<MetaMaskProvider
			debug={true}
			sdkOptions={{
				dappMetadata: {
					name: "CosVM Voting DApp",
					url: window.location.href,
				},
			}}
		>
			<BrowserRouter>
				<Routes>
					{routes.map((route) => {
						return (
							<Route
								key={route.path}
								path={route.path}
								element={
									<MetaDecoratedPage
										title={route.title}
										description={route.description}
										element={route.element}
									/>
								}
							>
								{route.children}
							</Route>
						);
					})}
					<Route
						path="*"
						element={
							<MetaDecoratedPage
								title="Not Found"
								description="This is the not found page of App"
								element={<NotFoundPage />}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		</MetaMaskProvider>
	);
};

export default Router;
