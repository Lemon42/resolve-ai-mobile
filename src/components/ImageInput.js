import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Text, Image } from "react-native";
import * as ImagePicker from "react-native-image-picker";

import Icon from "react-native-vector-icons/FontAwesome5";

function ImageInput(props) {
	const [imageFile, setImageFile] = useState(false);

	return (
		<View style={{ marginTop: 25 }}>
			<TouchableOpacity
				onPress={() =>
					ImagePicker.launchImageLibrary(
						{
							mediaType: "photo",
							includeBase64: false,
						},
						(response) => {
							if (response.didCancel) {
								return;
							}
							props.setImageProp(response);
							setImageFile(response);
						}
					)
				}
				style={styles.container}
			>
				{imageFile ? (
					<Image source={{ uri: imageFile.uri }} style={styles.image} />
				) : (
					<Icon
						name={props.icon || "camera"}
						color="#919191"
						size={70}
						solid
						style={{ marginBottom: 25 }}
					/>
				)}

				<Text style={styles.label}>
					{imageFile
						? props.editLabel || "Deseja mudar a foto?"
						: props.label || "Escolha uma imagem"}
				</Text>
			</TouchableOpacity>

			{imageFile ? (
				<TouchableOpacity
					onPress={() => {
						setImageFile(false);
						props.setImageProp(false);
					}}
					style={styles.removeImageContainer}
				>
					<Icon
						name={"times-circle"}
						color="#F53455"
						size={20}
						solid
						style={{ marginTop: -5, marginRight: 8 }}
					/>
					<Text style={styles.removeImage}>Remover imagem</Text>
				</TouchableOpacity>
			) : null}
		</View>
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
		width: 145,
		height: 145,
		borderRadius: 900,
		marginBottom: 20,
	},
	label: {
		color: "#919191",
		fontFamily: "Poppins Bold",
	},
	removeImageContainer: {
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		marginTop: 25,
	},
	removeImage: {
		color: "#F53455",
		fontFamily: "Poppins Bold",
		fontSize: 15,
	},
});

export default ImageInput;
