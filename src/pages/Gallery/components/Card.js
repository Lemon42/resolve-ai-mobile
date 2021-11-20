import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { SliderBox } from "react-native-image-slider-box";
import { Share } from "react-native";

function Card() {
	const [likeColor, setLikeColor] = useState("#000");
	const images = [

	];

	function handleLike() {
		if (likeColor == "#FA0626") {
			setLikeColor("#000");
		} else {
			setLikeColor("#FA0626");
		}
	}

	async function share() {
		try {
			let options = {
				message: `O problema ${'--'} foi solucionado. Veja mais pelo aplicativo ResolveAí!`
			};

			await Share.share(options);
		} catch (error) {
			alert(error.message);
		}
	}

	return (
		<View style={styles.wrapper}>
			<View style={styles.headerContainer}>
				<Text style={styles.title}>Título</Text>
				<Text style={styles.city}>{' '} - Cidade</Text>
			</View>

			<SliderBox
				images={images}

				ImageComponentStyle={{ borderRadius: 10, width: "94%", marginRight: 23, marginTop: 5 }}
				dotColor="#F8773B"
				imageLoadingColor="#F8773B"
				sliderBoxHeight={200}
			/>

			<View style={styles.menuContainer}>
				<TouchableOpacity onPress={() => handleLike()}>
					<Icon name="thumbs-up" size={25} color={likeColor} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => share()}>
					<Icon name="share" size={25} />
				</TouchableOpacity>
			</View>
			<View style={styles.line} />
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		paddingHorizontal: 5,
	},
	headerContainer: {
		display: "flex",
		flexDirection: "row",
		marginLeft: 2,
	},
	title: {
		fontFamily: "Poppins Black",
		fontSize: 19,
		color: "#1A1A1A",
	},
	city: {
		fontFamily: "Poppins",
		color: "#ABABAB",
		fontSize: 14,
		marginTop: 5,
		marginLeft: -1,
	},
	menuContainer: {
		marginTop: 25,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
	line: {
		borderTopWidth: 1,
		borderColor: "#ABABAB",
		marginTop: 20,
	}
});

export default Card
