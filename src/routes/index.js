import React, { useEffect } from "react";
import { StatusBar } from "react-native";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

import { useAccount } from "../contexts/AccountContext";

function Routes() {
	const { account } = useAccount();

	return (
		<>
			<StatusBar backgroundColor="#F8773B" />
			{
				!account.token ? (<AuthRoutes />) : (<AppRoutes />)
			}
		</>
	);
}

export default Routes;
