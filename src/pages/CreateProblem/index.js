import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from "react-native";

// Components
import PageScrollView from "../../components/PageScrollView";
import Map from "../../components/Map";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";

function CreateProblem() {

	const [selectLocation, setSelectLocation] = useState({});

	return (
		<PageScrollView>
			<Text style={styles.title}>Denunciar um problema</Text>

			<Input label="Título:" inLine={true} placeholder="De um título para o problema" />

			<Text style={styles.label}>Localização:</Text>
			<View style={styles.mapContainer}>
				<Map borderRadius={7} setSelectLocation={setSelectLocation} />
			</View>
				
			<TextArea label="Descrição:" placeholder="Digite uma descrição para o problema" />
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
})

export default CreateProblem;
