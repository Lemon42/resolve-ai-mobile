import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import * as ImagePicker from "react-native-image-picker";

import Icon from "react-native-vector-icons/FontAwesome5";

function ImageInput(props) {
	const [imageFile, setImageFile] = useState(false);

	return (
		<TouchableOpacity
			onPress={() =>
				ImagePicker.launchImageLibrary(
					{
						mediaType: "photo",
						includeBase64: false,
					},
					(response) => {
						setImageFile(response);
					}
				)
			}
			style={styles.container}
		>
			{
			imageFile ? (
				<Image
					source={{ uri: imageFile.uri }}
					style={styles.image}
				/>
			) : (
				<Icon
					name={props.icon || "camera"}
					color="#919191"
					size={70}
					solid
					style={{ marginBottom: 25 }}
				/>
			)
			}

			<Text style={styles.label}>{imageFile ? "Você está ótimo nessa foto!" : (props.label || "Escolha uma imagem")}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",

		paddingVertical: 25,

		borderColor: "#919191",
		borderWidth: 2.5,
		borderRadius: 12,
	},
	image: {
		width: 150,
		height: 150,
		borderRadius: 900,
		marginBottom: 20,
	},
	label: {
		color: "#919191",
		fontFamily: "Poppins Bold"
	},
});

export default ImageInput;
