import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

function FrontPage({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<View style={styles.titleContainer}>
					<Text style={{...styles.title, color: "#1A1A1A"}}>Resolve</Text>
					<Text style={{...styles.title, color: "#F8773B"}}>Ai!</Text>
				</View>
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
	titleContainer: {
		position: "absolute",
		marginTop: 10,
		width: "100%",
		display: "flex",
		justifyContent: "center",
		flexDirection: "row",
		zIndex: 9999,
	},
	title: {
		fontFamily: "Poppins Black",
		fontSize: 30,
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
		zIndex: 9998,
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
