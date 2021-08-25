import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import Maps from "../../components/Map/MapPage";
import ProblemMenu from "./components/ProblemMenu";
import SelectInput from "../../components/SelectInput";

function Map() {
	const [problemOnDisplay, setProblemOnDisplay] = useState({});
	const [problemVisible, setProblemVisible] = useState(false);
	const [city, setCity] = useState();

	function setDisplay(problem) {
		setProblemOnDisplay(problem);
		setProblemVisible(!problemVisible);
	}

	return (
		<View style={{ flex: 1 }}>
			<ProblemMenu visible={problemVisible} setVisible={setProblemVisible} problem={problemOnDisplay || {}} />
			<Maps problemOnDisplay={setDisplay} city={city} />

			<View style={styles.container}>
				<SelectInput
					setValue={(value) => {setCity(value)}}
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
					placeholder="Altere a cidade aqui"

					notForm
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		width: "100%",
		marginTop: -15,
		paddingHorizontal: 8,
	}
});

export default Map;
