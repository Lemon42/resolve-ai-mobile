import React from "react";
import { View, Text, StyleSheet } from "react-native";

function PageTitle(props){
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{props.title}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		color: "#fff",
		fontFamily: "Poppins Bold",
		fontSize: 19,
		marginBottom: 10,
	},
	container: {
		width: "100%",
		backgroundColor: "#F8773B",
		paddingHorizontal: 7,
		paddingTop: 15,
		paddingBottom: 2,
		marginBottom: 20,
		elevation: 6,
	},
})

export default PageTitle;
