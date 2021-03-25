import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useAccount } from '../../contexts/AccountContext';

function Map() {

	const { signOut } = useAccount();

	return (
		<View style={{ flex: 1 }}>
			<TouchableOpacity onPress={() => signOut()}>
				<Text>salve</Text>
			</TouchableOpacity>
		</View>
	);
}

export default Map;
