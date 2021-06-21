import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

function Input(props) {

	let styles;

	if (!props.inLine) {
		styles = StyleSheet.create({
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
	} else {
		styles = StyleSheet.create({
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
			},
			input: {
				height: 45,
				borderBottomWidth: 2.5,
				borderColor: "#F8773B",
				color: "#2B2B2B",
				fontFamily: "Poppins",
				fontSize: 15,
				paddingBottom: -7,
			},
		});
	}

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{props.label}</Text>
			<TextInput
				style={styles.input}
				keyboardType={props.type || "default"}
				onChangeText={props.onChangeText}
				placeholder={props.placeholder || ""}
				placeholderTextColor="#999"
			/>
		</View>
	);
}

export default Input;
