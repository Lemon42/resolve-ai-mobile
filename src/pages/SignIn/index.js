import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	Image,
	SafeAreaView,
	ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Components
import Input from "../../components/Input";

// Styles
import buttonStyle from "../../styles/button";

function SignIn({ navigation }) {
	const [form, setForm] = useState({
		email: "",
		pass: "",
	});
	const [passIsVisible, setPassIsVisible] = useState(true);

	return (
		<SafeAreaView>
			<ScrollView>
				<View style={styles.topContainer}>
					<Text style={styles.title}>Bem-vindo de volta!</Text>
					<Input
						label="Email:"
						type="email-address"
						onChange={(value) => setForm({ ...form, value })}
					/>
					<Input
						label="Senha:"
						isVisible={passIsVisible}
						onChange={(value) => setForm({ ...form, value })}
					/>

					<TouchableOpacity
						onPress={() => setPassIsVisible(!passIsVisible)}
					>
						<View style={styles.togglePassVisibleContainer}>
							<Icon
								name={passIsVisible ? "eye-slash" : "eye"}
								size={18}
								color="#999"
							/>
						</View>
					</TouchableOpacity>
					<View>
						<TouchableOpacity
							style={{ ...buttonStyle.container, marginTop: 15 }}
						>
							<Text style={buttonStyle.button}>Entrar</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						onPress={() => navigation.navigate("CreateAccount")}
					>
						<Text style={styles.backButton}>
							Não tem uma conta? {passIsVisible}
							<Text style={{ fontFamily: "Poppins Bold" }}>
								Cadastre.
							</Text>
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.bottomContainer}>
					<Image
						source={require("../../assets/images/GirlAndDog.png")}
						style={{
							height: 134,
							width: 185,
						}}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
	},
	topContainer: {
		width: "100%",
		paddingHorizontal: 22,
	},
	title: {
		marginTop: 20,
		marginBottom: 25,
		fontFamily: "Poppins Bold",
		letterSpacing: 0,
		fontSize: 25,
		color: "#F8773B",
		textAlign: "center",
	},
	togglePassVisibleContainer: {
		width: "100%",
		display: "flex",
		alignItems: "flex-end",
		justifyContent: "flex-end",
		marginTop: -5,
	},
	backButton: {
		marginTop: 25,
		marginBottom: -25,
		fontFamily: "Poppins",
		fontSize: 14,
		color: "#919191",
		textAlign: "center",
	},
	bottomContainer: {
		width: "100%",
		height: 185,

		display: "flex",
		alignItems: "flex-end",
		justifyContent: "flex-end",
	},
});

export default SignIn;
