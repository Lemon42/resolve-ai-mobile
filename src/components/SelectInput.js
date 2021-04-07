import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import Icon from "react-native-vector-icons/FontAwesome5";

function SelectInput(props) {
	const [selectValue, setSelectValue] = useState({
		value: props.value,
		setValue: props.setValue,
	});

	return (
		<View style={containerStyle.container}>
			<Text style={containerStyle.label}>{props.label}</Text>

			<View style={style.wrapper}>
				<RNPickerSelect
					onValueChange={(value) =>
						setSelectValue({
							...selectValue,
							value: value,
							exists: true,
						})
					}
					items={props.items}

					useNativeAndroidPickerStyle={true}
					placeholder={{
						label: props.placeholder,
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
		</View>
	);
}

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
	},
	inputIOS: {
		color: "#2B2B2B",
		fontFamily: "Poppins",
		fontSize: 15,
	},
	inputAndroid: {
		color: "#2B2B2B",
		fontFamily: "Poppins",
		fontSize: 15,
	},
	iconContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "89%",
		right: 8
	 },
});

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
