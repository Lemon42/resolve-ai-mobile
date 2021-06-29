import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import axios from "axios";

import { API_URL } from "@env";

// Components
import PageScrollView from "../../components/PageScrollView";
import LockPage from "../../components/LockPage";
import Map from "../../components/Map";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import MultipleImagesInput from "../../components/MultipleImagesInput";

// Context
import { useAccount } from "../../contexts/AccountContext";

// Styles
import button from "../../styles/button";

function CreateProblem() {

	const { account } = useAccount();

	const [isLocked, setLocked]= useState(false);
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
			.then((response) => {
				setLocked(false);

				if(response.data.error){
					setMessage(response.data.error);
				} else { 
					setMessage("");
				}
			})
			.catch(() => {
				setLocked(false);
				setMessage("Ops! Tivemos um erro.");
			})

	}

	return (
		<PageScrollView>
			<LockPage isLocked={isLocked} />
			<Text style={styles.title}>Denunciar um problema</Text>

			<Input onChangeText={(value) => setForm({ ...form, title: value })}
				label="Título:" inLine={true} placeholder="De um título para o problema"
			/>

			<Text style={styles.label}>Localização:</Text>
			<View style={styles.mapContainer}>
				<Map borderRadius={7} setSelectLocation={setSelectLocation} />
			</View>

			<TextArea onChangeText={(value) => setForm({ ...form, description: value })}
				label="Descrição:" placeholder="Digite uma descrição para o problema"
			/>

			<Text style={styles.label}>Imagens:</Text>
			<MultipleImagesInput images={images} setImages={setImages} />

			<View style={{ ...button.container, marginTop: 30, marginBottom: 15 }}>
				<TouchableOpacity onPress={() => sendForm()}>
					<Text style={button.button}>Adicionar</Text>
				</TouchableOpacity>
			</View>

			<Text style={styles.errorMessage}>{message}</Text>
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
