import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

function Input(props) {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{props.label}</Text>
			<TextInput
				style={styles.input}
				keyboardType={props.type || "default"}
				secureTextEntry={props.isVisible || false}
				onChangeText={props.onChangeText || {}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		width: "100%",
		flexDirection: "column",
		marginBottom: 22,
	},
	label: {
		color: "#F8773B",
		fontFamily: "Poppins",
		fontSize: 15,
		marginLeft: 22,
		marginBottom: 5,
	},
	input: {
		height: 48,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",

		borderWidth: 2.5,
		borderRadius: 30,
		borderColor: "#F8773B",

		paddingLeft: 22,
		paddingRight: 15,
		color: "#2B2B2B",
		fontFamily: "Poppins",
		fontSize: 15,
	},
});

export default Input;
