import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import Routes from "./routes";
import AccountProvider from "./contexts/AccountContext";
import DetailsProvider from "./contexts/DetailsContext";

export default function App() {
	return (
		<NavigationContainer>
			<AccountProvider>
				<DetailsProvider>
					<Routes />
				</DetailsProvider>
			</AccountProvider>
		</NavigationContainer>
	);
}
