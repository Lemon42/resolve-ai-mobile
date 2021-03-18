import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

// Components
import Input from '../../components/Input';

// Assets
import ImageFigure from "../../assets/svgs/figure2.svg";

function SignIn({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
				<Text style={styles.title}>Bem-vindo de volta!</Text>
				<Input label="Email:" />
				<Input label="Senha:" />
				<TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
					<Text style={styles.backButton}>
						Não tem uma conta?{" "}
						<Text style={{ fontFamily: "Poppins Bold" }}>Cadastre.</Text>
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.bottomContainer}>
				<ImageFigure />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
	},
	topContainer: {
		width: "100%",
		paddingHorizontal: 22,
	},
	title: {
		marginTop: 28,
		marginBottom: 25,
		fontFamily: "Poppins Bold",
		letterSpacing: 0,
		fontSize: 25,
		color: "#F8773B",
		textAlign: "center",
	},
	backButton: {
		marginTop: 12,
		fontFamily: "Poppins",
		fontSize: 14,
		color: "#919191",
		textAlign: "center",
	},
	bottomContainer: {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "flex-end",
		width: "100%",
	},
});

export default SignIn;
