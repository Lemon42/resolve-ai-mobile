import React, { useState } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Text,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function PassInput(props) {

	const [isVisible, setIsVisible] = useState(false);

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{props.label}</Text>
			<View style={styles.inputWrapper}>
				<View style={{ flex: 6, }}>
					<TextInput style={styles.input} onChangeText={props.onChangeText} secureTextEntry={!isVisible} />
				</View>
				<View style={{ flex: 1 }}>
					<TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
						<Icon name={isVisible ? "eye" : "eye-slash"} size={18} color="#999" />
					</TouchableOpacity>
				</View>
			</View>
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
	inputWrapper: {
		flexDirection: "row",
		height: 48,
		width: "100%",
		paddingLeft: 22,
		alignItems: "center",
		justifyContent: "center",

		borderWidth: 2.5,
		borderRadius: 30,
		borderColor: "#F8773B",
	},
	input: {
		height: "100%",
		display: "flex",
		alignItems: "center",
		color: "#2B2B2B",
		fontFamily: "Poppins",
		fontSize: 15,
		padding: 0,
		backgroundColor: "transparent",
	},
});

export default PassInput;
