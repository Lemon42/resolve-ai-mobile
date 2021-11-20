import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import axios from "axios";

import { API_URL } from "@env";

// Components
import PageScrollView from "../../components/PageScrollView";
import PageTitle from "../../components/PageTitle";
import LockPage from "../../components/LockPage";
import Map from "../../components/Map";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import MultipleImagesInput from "../../components/MultipleImagesInput";

// Context
import { useAccount } from "../../contexts/AccountContext";
import { useDetails } from "../../contexts/DetailsContext";

// Styles
import button from "../../styles/button";

function CreateProblem({ navigation }) {
	const { account } = useAccount();
	const { setVisible, setDetails } = useDetails();

	const [isLocked, setLocked] = useState(false);
	const [selectLocation, setSelectLocation] = useState({});
	const [images, setImages] = useState([]);
	const [message, setMessage] = useState("");

	const [form, setForm] = useState({
		title: "",
		description: "",
	});

	async function sendForm() {
		setLocked(true);
		var formData = new FormData();

		// Lidando com a imagem
		images.forEach((image) => {
			let name = image.path.split("/");
			formData.append(`images[]`, {
				name: name[name.length - 1],
				type: image.mime,
				uri:
					Platform.OS === "android"
						? image.path
						: image.path.replace("file://", ""),
			});
		});

		// Lidando com título e descrição
		Object.keys(form).forEach(function (item) {
			formData.append(item, form[item]);
		});

		if (selectLocation != {}) {
			formData.append("latitude", selectLocation.latitude);
			formData.append("longitude", selectLocation.longitude);
		}

		await axios
			.post(`${API_URL}/create-problem`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					"email": account.email,
					"token": account.token,
				},
			})
			.then(async (response) => {
				if (response.data.error) {
					setLocked(false);
					setMessage(response.data.error);
				} else {
					setMessage("");
					setDetails(response.data);
					setVisible(true);

					// Reset do form
					setForm({
						title: "",
						description: "",
					});
					setSelectLocation({});
					setImages([]);

					setLocked(false);
					navigation.navigate('List');
				}
			})
			.catch(() => {
				setMessage("Ops! Tivemos um erro.");
			});
	}

	return (
		<PageScrollView viewStyle={{ marginTop: 0 }}>
			<LockPage isLocked={isLocked} />
			<PageTitle title="Denunciar problema" />
			<View style={{ paddingHorizontal: 8 }}>


				<Input onChangeText={(value) => setForm({ ...form, title: value })}
					label="Título:" inLine={true} placeholder="De um título para o problema"
					value={form.title}
				/>

				<Text style={styles.label}>Localização: </Text>
				<View style={styles.mapContainer}>
					<Map borderRadius={7} setSelectLocation={setSelectLocation} />
				</View>

				<TextArea onChangeText={(value) => setForm({ ...form, description: value })}
					label="Descrição:" placeholder="Digite uma descrição para o problema"
				/>

				<Text style={styles.label}>Imagens: </Text>
				<MultipleImagesInput images={images} setImages={setImages} />

				<View style={{ ...button.container, marginTop: 30, marginBottom: 15 }}>
					<TouchableOpacity onPress={() => sendForm()}>
						<Text style={button.button}>Adicionar</Text>
					</TouchableOpacity>
				</View>

				<Text style={styles.errorMessage}>{message}</Text>
			</View >
		</PageScrollView>
	);
}

const styles = StyleSheet.create({
	title: {
		color: "#F8773B",
		fontFamily: "Poppins Bold",
		fontSize: 19,
		marginBottom: 10,
	},
	label: {
		color: "#F8773B",
		fontFamily: "Poppins",
		fontSize: 14,
	},
	mapContainer: {
		height: 300,
		marginTop: 4,
		marginBottom: 20,
	},
	errorMessage: {
		fontFamily: "Poppins Bold",
		color: "#F53455",
		marginBottom: 20,
		textAlign: "center",
	}
})

export default CreateProblem;
