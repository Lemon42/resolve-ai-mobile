import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

function FrontPage({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={require("../../assets/images/wallpaper-front_page.jpg")}
				/>
				<View style={styles.buttonsContainer}>
					<View style={{ ...styles.buttonContainer, borderRightWidth: 2 }}>
						<TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
							<Text style={{ ...styles.textButton, color: "#2B2B2B" }}>
								ENTRAR
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
							<Text style={{ ...styles.textButton, color: "#F8773B" }}>
								CADASTRAR
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
	},
	imageContainer: {
		flex: 1,
		alignItems: "center",
	},
	image: {
		width: "150%",
		height: "80%",
		marginTop: -10,
		resizeMode: "cover",
		borderBottomLeftRadius: 250,
		borderBottomRightRadius: 250,
		zIndex: 9999,
	},
	buttonsContainer: {
		marginTop: "10%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",

		width: "100%",
		height: "10%",
	},
	buttonContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "50%",
		height: "240%",
		zIndex: 0,
		borderColor: "#D6D6D6",
	},
	textButton: {
		fontFamily: "Poppins Bold",
		letterSpacing: 0,
		fontSize: 23,
	},
});

export default FrontPage;
