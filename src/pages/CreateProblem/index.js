import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

// Components
import Map from "../../components/Map";

function CreateProblem() {

	const [selectLocation, setSelectLocation] = useState({});

	return (
		<View>
			<View style={styles.mapContainer}>
				<Map borderRadius={7} setSelectLocation={setSelectLocation} />
			</View>

			<Text>-- {JSON.stringify(selectLocation)}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	mapContainer: {
		height: 300,
		margin: 4,
	}
})

export default CreateProblem;
