import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from "react-native";

// Components
import Map from "../../components/Map";
import Input from "../../components/Input";

function CreateProblem() {

	const [selectLocation, setSelectLocation] = useState({});

	return (
		<ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
			<View style={{ marginHorizontal: 6, flex: 1 }}>
				<Text style={styles.title}>Denunciar um problema</Text>

				<Input label="Título:" inLine={true} />

				<Text style={styles.label}>Localização:</Text>
				<View style={styles.mapContainer}>
					<Map borderRadius={7} setSelectLocation={setSelectLocation} />
				</View>
				<Text>-- {JSON.stringify(selectLocation)}</Text>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	title: {
		color: "#F8773B",
		fontFamily: "Poppins Bold",
		fontSize: 19,
	},
	label: {
		color: "#F8773B",
		fontFamily: "Poppins",
		fontSize: 14,
	},
	mapContainer: {
		height: 300,
		marginTop: 4,
	},
})

export default CreateProblem;
