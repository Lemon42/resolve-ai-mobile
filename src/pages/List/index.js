import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Item from "./components/Item";

function ListPage(){
	return(
		<View style={styles.content}>
			<Item />
		</View>
	);
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: "#fff",
	}
});

export default ListPage;
