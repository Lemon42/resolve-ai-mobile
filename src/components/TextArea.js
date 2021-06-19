import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

function TextArea(props) {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{props.label}</Text>
			<TextInput style={styles.input} 
				multiline={true} 
				numberOfLines={props.numberOfLines || 4} 
				
				placeholder={props.placeholder}
				placeholderTextColor="#999"
				
				onChangeText={props.onChangeText}
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
		marginBottom: 5,
	},
	input: {
		height: 150,
		display: "flex",
		justifyContent: "flex-start",
		textAlignVertical: 'top',
		
		paddingLeft: 7,
		paddingRight: 5,
		color: "#2B2B2B",
		fontFamily: "Poppins",
		fontSize: 15,

		borderWidth: 2.5,
		borderColor: "#F8773B",
		borderRadius: 7,
	},
})

export default TextArea;
