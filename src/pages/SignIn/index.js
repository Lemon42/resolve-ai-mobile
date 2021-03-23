import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	Image,
	SafeAreaView,
	ScrollView,
	Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

// Components
import Input from "../../components/Input";

// Styles
import buttonStyle from "../../styles/button";

function SignIn({ navigation }) {
	const [passIsVisible, setPassIsVisible] = useState(true);
	const [form, setForm] = useState({
		email: "",
		pass: "",
	});
	const [sendMessage, setSendMessage] = useState("");
	const dimensions = Dimensions.get('window');

	function sendForm() {
		setSendMessage("");

		axios.post("http://192.168.1.191:3333/login", { ...form, type: "mobile" })
			.then(function (response) {
				setSendMessage(response.data.error);
			})
			.catch(function (error) {
				setSendMessage("Ops! Tivemos um erro.");
			});
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={dimensions.height > 961 ? { flex: 1 } : {}}>
				<View style={styles.topContainer}>
					<Text style={styles.title}>Bem-vindo de volta!</Text>
					<Input
						label="Email:"
						type="email-address"
						onChangeText={(value) => setForm({ ...form, email: value })}
					/>
					<Input
						label="Senha:"
						isVisible={passIsVisible}
						onChangeText={(value) => setForm({ ...form, pass: value })}
					/>

					<TouchableOpacity
						onPress={() => setPassIsVisible(!passIsVisible)}
					>
						<View style={styles.togglePassVisibleContainer}>
							<Text style={styles.alertMessage}>{sendMessage}</Text>
							<Icon
								name={passIsVisible ? "eye-slash" : "eye"}
								size={18}
								color="#999"
							/>
						</View>
					</TouchableOpacity>
					<View>
						<TouchableOpacity
							onPress={() => sendForm()}
							style={{ ...buttonStyle.container, marginTop: 30 }}
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
							height: (dimensions.height / 4),
							width: (dimensions.width / 2),
						}}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		height: "100%",
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
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 10,
		marginTop: -5,
	},
	alertMessage: {
		fontFamily: "Poppins Medium",
		fontSize: 14,
		color: "#F53455",
	},
	backButton: {
		marginTop: 25,
		fontFamily: "Poppins",
		fontSize: 14,
		color: "#919191",
		textAlign: "center",
	},
	bottomContainer: {
		flex: 1,
		alignSelf: "flex-end",
		alignItems: "flex-end",
		justifyContent: "flex-end",
		marginTop: 25,
	},
});

export default SignIn;
