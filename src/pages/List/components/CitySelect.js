import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";

function CitySelect(props) {
	const [isActive, setActive] = useState(false);

	function setValue(value) {
		if(value == "false") {
			setActive(false);
		} else {
			setActive(true);
		}

		props.sendForm({ ...props.value, city: value });
	}

	return (
		<>
			<RNPickerSelect
				onValueChange={(value) => setValue(value)}
				items={[
					{ label: "Jundiaí", value: "Jundiaí" },
					{ label: "Vinhedo", value: "Vinhedo" },
					{ label: "Várzea Paulista", value: "Várzea Paulista" },
					{ label: "Campo L. Paulista", value: "Campo Limpo Paulista" },
					{ label: "Louveira", value: "Louveira" },
					{ label: "Cabreúva", value: "Cabreúva" },
				]}

				useNativeAndroidPickerStyle={false}
				placeholder={{
					label: "Todas",
					value: "false",
					color: "#cccbd2"
				}}
				placeholderTextColor="#cccbd2"
				style={isActive ? active : style}

			/>

			{/* 
			+ Resolução de bug que ocasiona o fechamento inesperado do aplicativo +
			(ao que parece a biblioteca RNPickerSelect gera conflito com o React Navigation)
			NÃO REMOVA O CAMPO DE TEXTO VAZIO
		 */}
			<Text
				style={{
					width: "100%",
					height: "100%",
					position: "absolute",
					bottom: 0,
					left: 0,
				}}>
				{' '}
			</Text>
		</>
	);
}

const style = {
	inputIOS: {
		color: "#cccbd2",
		fontFamily: "Poppins",
		fontSize: 15,
	},
	inputAndroid: {
		color: "#cccbd2",
		fontFamily: "Poppins",
		fontSize: 15,

		borderWidth: 1,
		borderRadius: 4,
		borderColor: "#cccbd2",

		paddingRight: 2,
		paddingTop: 2,
		paddingBottom: 0,
	},
	iconContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "80%",
		right: 8,
	},
};

const active = StyleSheet.create({
	inputIOS: {
		color: "#F8773B",
		fontFamily: "Poppins",
		fontSize: 15,
	},
	inputAndroid: {
		color: "#F8773B",
		fontFamily: "Poppins",
		fontSize: 15,

		borderWidth: 1,
		borderRadius: 4,
		borderColor: "#F8773B",

		paddingRight: 2,
		paddingTop: 2,
		paddingBottom: 0,
	},
})

export default CitySelect;
