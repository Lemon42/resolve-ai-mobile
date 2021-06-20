import React from "react";
import { TouchableOpacity, Text } from "react-native";

import { useAccount } from '../../contexts/AccountContext';

import PageScrollView from "../../components/PageScrollView";

function UserPage(){

	const { signOut } = useAccount();

	return(
		<PageScrollView>
			<TouchableOpacity onPress={() => signOut()}>
				<Text>Logout</Text>
			</TouchableOpacity>
		</PageScrollView>
	);
}

export default UserPage;
