import React from "react";
import { Image, View, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";

import styles from "./styles/thumbnail";

function Thumbnail(props) {

	console.log(props.image)

	function removeImage() {
		const newArray = [];
		for (let i = 0; i < props.images.length; i++) {
			if (i != props.index) {
				newArray.push(props.images[i]);
			}
		}

		props.setImages(newArray);
	}

	return (
		<View style={styles.container} key={props.index}>
			<View style={styles.wrapper}>
				<Image
					source={{ uri: props.image.path }}
					style={styles.image}
				/>
				<TouchableOpacity onPress={() => removeImage()} style={styles.removeImageButton}>
					<Icon
						name={"trash"}
						color="#fff"
						size={13}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default Thumbnail;
