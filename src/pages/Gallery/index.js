import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Title from "../../components/PageTitle";
import ScrollView from "../../components/PageScrollView";
import Card from "./components/Card";

function GalleryPage() {
	return (
		<ScrollView viewStyle={{ marginTop: 0 }}>
			<Title title="Problemas solucionados" />
			<View style={{ paddingHorizontal: 8 }}>
				<Card />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	title: {
		color: "#F8773B",
		fontFamily: "Poppins Bold",
		fontSize: 19,
		marginBottom: 10,
	},
});

export default GalleryPage;
