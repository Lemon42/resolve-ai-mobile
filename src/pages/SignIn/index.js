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

// Components
import Input from "../../components/Input";
import PassInput from "../../components/PassInput";
import LockPage from "../../components/LockPage";
import Icon from "react-native-vector-icons/FontAwesome5";

// Styles
import buttonStyle from "../../styles/button";

// Context
import { useAccount } from "../../contexts/AccountContext";

function SignIn({ navigation }) {
	const { singIn } = useAccount();

	const [isLocked, setLocked] = useState(false);
	const [form, setForm] = useState({
		email: "",
		pass: "",
	});
	const [sendMessage, setSendMessage] = useState("");
	const dimensions = Dimensions.get("window");

	async function sendForm() {
		setSendMessage("");
		setLocked(true);

		const response = await singIn(form.email, form.pass);

		setLocked(false);
		setSendMessage(response);
	}

	return (
		<SafeAreaView style={styles.container}>
			<LockPage isLocked={isLocked} />
			<ScrollView
				contentContainerStyle={dimensions.height > 961 ? { flex: 1 } : {}}
			>
				<View style={styles.topContainer}>
					<Text style={styles.title}>Bem-vindo de volta!{ }</Text>
					<Input
						label="Email:"
						type="email-address"
						onChangeText={(value) => setForm({ ...form, email: value })}
					/>
					<PassInput
						label="Senha:"
						onChangeText={(value) => setForm({ ...form, pass: value })}
					/>
					<View style={{ marginLeft: 7, marginBottom: 5 }}>
						<Text style={styles.alertMessage}>{sendMessage}</Text>
					</View>
					<View>
						<TouchableOpacity
							onPress={() => sendForm()}
							style={{ ...buttonStyle.container, marginTop: 15 }}
						>
							<Text style={buttonStyle.button}>Entrar</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						onPress={() => navigation.navigate("CreateAccount")}
					>
						<Text style={styles.backButton}>
							Não tem uma conta?
							<Text>{" "}</Text>
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
							height: dimensions.height / 4,
							width: dimensions.width / 2,
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
		backgroundColor: "#fff",
	},
	topContainer: {
		width: "100%",
		paddingTop: 0,
		paddingBottom: 22,
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
		marginTop: 5,
	},
});

export default SignIn;
