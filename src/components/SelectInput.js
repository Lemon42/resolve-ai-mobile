import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import Icon from "react-native-vector-icons/FontAwesome5";

function SelectInput(props) {
	const style = StyleSheet.create({
		wrapper: {
			height: 48,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",

			borderWidth: 2.5,
			borderRadius: 30,
			borderColor: "#F8773B",

			paddingLeft: 2,
			paddingRight: 15,
			backgroundColor: "#fff",
		},
		inputIOS: {
			color: props.color || "#2B2B2B",
			fontFamily: "Poppins",
			fontSize: 15,
		},
		inputAndroid: {
			color: props.color || "#2B2B2B",
			fontFamily: "Poppins",
			fontSize: 15,
		},
		iconContainer: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			height: "89%",
			right: 8,
		},
	});

	if (props.notForm) {
		style.wrapper = {
			...style.wrapper,
			shadowOffset: { width: 10, height: 10, },
			shadowColor: 'black',
			shadowOpacity: 1.0,
			elevation: 5,

			borderRadius: 2.5,
			borderWidth: 2,
			borderColor: 'white'
		}

		style.iconContainer = { ...style.iconContainer, right: 0 }
	}

	return (
		<View style={containerStyle.container}>
			<Text style={containerStyle.label}>{props.label || ''}</Text>

			<View style={style.wrapper}>
				<RNPickerSelect
					onValueChange={(value) => props.setValue(value)}
					items={props.items}

					useNativeAndroidPickerStyle={true}
					placeholder={{
						label: props.placeholder || 'Selecione um valor aqui',
						color: "#919191",
						value: null,
					}}
					style={style}

					Icon={() => {
						return (
							<Icon
								name={"sort-down"}
								color="#999"
								size={22}
							/>
						);
					}}
				/>
			</View>

			{/* 
				+ Resolução de bug que ocasiona o fechamento inesperado do aplicativo +
				(ao que parece a biblioteca RNPickerSelect gera conflito com o React Navigation)
				NÃO REMOVA O CAMPO DE TEXTO VAZIO
			 */}
			<Text
				style={{
					width: '100%',
					height: '100%',
					position: 'absolute',
					bottom: 0,
					left: 0,
				}}>
				{' '}
			</Text>
		</View>
	);
}

const containerStyle = StyleSheet.create({
	container: {
		display: "flex",
		width: "100%",
		flexDirection: "column",
		marginBottom: 22,

	},
	label: {
		color: "#F8773B",
		fontFamily: "Poppins",
		fontSize: 15,
		marginLeft: 22,
		marginBottom: 5,
	},
});

export default SelectInput;
