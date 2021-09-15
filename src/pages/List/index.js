import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import ScrollView from "../../components/PageScrollView";
import Item from "./components/Item";
import Details from "./components/Details";

function ListPage(){
	const [isVisible, setVisible] = useState(false);

	return(
		<ScrollView>
			<Item setDataisVisible={setVisible} />

			<Details isVisible={isVisible} hide={setVisible} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: "#fff",
	}
});

export default ListPage;
