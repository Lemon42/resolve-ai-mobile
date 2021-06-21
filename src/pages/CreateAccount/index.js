import React, { useState } from "react";
import {
	View,
	SafeAreaView,
	ScrollView,
	Text,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";

import { API_URL } from "@env";

// Components
import Input from "../../components/Input";
import SelectInput from "../../components/SelectInput";
import PassInput from "../../components/PassInput";
import ImageInput from "../../components/ImageInput";
import LockPage from "../../components/LockPage";

// Assets
import Figure from "../../assets/svgs/figure1.svg";

// Styles
import buttonStyle from "../../styles/button";

// Context
import { useAccount } from "../../contexts/AccountContext";

function CreateAccount({ navigation }) {
	const { singIn } = useAccount();

	const [isLocked, setLocked] = useState(false);
	const [form, setForm] = useState({
		name: "",
		email: "",
		city: "",
		pass: "",
		confirmationPass: "",
	});
	const [message, setMessage] = useState("");
	const [picture, setPicture] = useState(false);
	
	function validateForm() {
		if (form.pass == "" || form.pass == null) {
			setMessage("Digite uma senha!");
		} else if (form.pass != form.confirmationPass) {
			setMessage("As senhas não são iguais!");
		} else {
			let validate = true;

			Object.keys(form).forEach(function (item) {
				if (form[item] == "" || form[item] == null) {
					setMessage("Preencha todos os campos");
					validate = false;
				}
			});

			if (!validate) {
				return;
			}

			setMessage("");
			sendForm();
		}
	}

	async function sendForm() {
		setLocked(true);

		let created = true;
		var formData = new FormData();

		// Lidando com a imagem
		if (picture) {
			formData.append("picture", {
				name: picture.fileName,
				type: picture.type,
				uri:
					Platform.OS === "android"
						? picture.uri
						: picture.uri.replace("file://", ""),
			});
		}

		// Transformando o JSON em Form Data
		Object.keys(form).forEach(function (item) {
			formData.append(item, form[item]);
		});

		formData.append("lastName", "oiiiii");
		await axios
			.post(`${API_URL}/create-user`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then(async (response) => {
				if (response.data.error) {
					setMessage(response.data.type);
					created = false;
					return;
				}
			})
			.catch((error) => {
				setMessage("Ops! Tivemos um erro...");
			});

		if (created) {
			const response = await singIn(form.email, form.pass);
			setMessage(response);
		}

		setLocked(false);
	}

	return (
		<SafeAreaView>
			<LockPage isLocked={isLocked} />
			<ScrollView>
				<View style={styles.container}>
					<View style={{ display: "flex", width: "100%", marginLeft: 35 }}>
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Icon
								name={"long-arrow-alt-left"}
								color="#D6D6D6"
								size={35}
							/>
						</TouchableOpacity>
					</View>
					<Text style={styles.title}>Crie uma conta</Text>
					<Figure width={230} height={150} style={{ marginBottom: -25 }} />
					<View style={styles.wrapper}>
						<Input
							label="Nome:"
							onChangeText={(value) => setForm({ ...form, name: value })}
						/>
						<Input
							label="Email:"
							onChangeText={(value) =>
								setForm({ ...form, email: value })
							}
						/>
						<SelectInput
							setValue={(city) => setForm({ ...form, city: city })}
							items={[
								{ label: "Jundiaí", value: "Jundiaí" },
								{ label: "Vinhedo", value: "Vinhedo" },
								{ label: "Várzea Paulista", value: "Várzea Paulista" },
								{
									label: "Campo Limpo Paulista",
									value: "Campo Limpo Paulista",
								},
								{ label: "Louveira", value: "Louveira" },
								{ label: "Cabreúva", value: "Cabreúva" },
							]}
							label="Cidade:"
							placeholder="Escolha uma cidade"
						/>
						<PassInput
							label="Senha:"
							onChangeText={(value) => setForm({ ...form, pass: value })}
						/>
						<PassInput
							label="Confirme a senha:"
							onChangeText={(value) =>
								setForm({ ...form, confirmationPass: value })
							}
						/>
						<ImageInput
							setImageProp={setPicture}
							label="Que tal uma foto de perfil?"
							editLabel="Você está ótimo nessa foto!"
						/>

						<Text style={styles.alertMessage}>{message}</Text>

						<TouchableOpacity
							onPress={() => validateForm()}
							style={{ ...buttonStyle.container, marginTop: -25 }}
						>
							<Text style={buttonStyle.button}>Cadastrar</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => navigation.navigate("SignIn")}
							style={{
								display: "flex",
								justifyContent: "center",
								flexDirection: "row",
								marginTop: 35,
							}}
						>
							<Text style={styles.backButton}>Já tem uma conta? </Text>
							<Text
								style={{
									...styles.backButton,
									fontFamily: "Poppins Bold",
								}}
							>
								Faça login.
							</Text>
						</TouchableOpacity>
					</View>
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
		marginTop: 8,
	},
	wrapper: {
		width: "100%",
		marginTop: 55,
		paddingHorizontal: 22,
	},
	title: {
		marginTop: -2,
		marginBottom: 10,
		fontFamily: "Poppins Bold",
		letterSpacing: 0,
		fontSize: 25,
		color: "#F8773B",
		textAlign: "center",
	},
	backButton: {
		fontFamily: "Poppins",
		fontSize: 14,
		color: "#919191",
		textAlign: "center",
		marginBottom: 25,
	},
	alertMessage: {
		fontFamily: "Poppins Bold",
		fontSize: 15,
		color: "#FFE921",
		marginTop: 22,
		marginBottom: 44,
	},
});

export default CreateAccount;
