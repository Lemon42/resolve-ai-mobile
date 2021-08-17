import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import Maps from "../../components/Map/MapPage";

// No inicio ele vai buscar os marcadores pela localização do usuário
// Caso der errado ele vai buscar por todos
// O usuário pode escolher em qual cidade ele quer ver os problemas

function Map() {
	return (
		<View style={{ flex: 1 }}>
			<Maps />

			<View style={styles.container}>
				<Text>De escolher cidade</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
	}
});

export default Map;
