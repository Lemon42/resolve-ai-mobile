import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SliderBox } from "react-native-image-slider-box";

import Button from "./Button";

function Item(props) {
	const images = [
		"https://s2.glbimg.com/BXoCVbSSUMqwk8SrldbMK3pYYbg=/0x0:1280x960/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2018/1/p/JbO1BoTCu5FmmTAWCQvA/cratera-joao-pessoa-bayeux.jpg",
		"https://www.acritica.com/uploads/news/image/741937/show_buraco.jpeg",
		"https://midias.gazetaonline.com.br/_midias/jpg/2018/11/12/buraco1-5873723.jpg",
	];

	return (
		<View style={styles.content}>
			{/* Título */}
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Buraco na rua</Text>
				<Text style={styles.city}>- Jundiaí</Text>
			</View>

			{/* Imagens */}
			<SliderBox
				images={images}

				dotColor="#F8773B"
				imageLoadingColor="#F8773B"
				sliderBoxHeight={230}
			/>

			{/* Menu */}
			<View style={styles.menuContainer}>
				<Button icon="arrow-up" />
				<Button icon="arrow-down" />
				<Button icon="message-circle" />
				<Button icon="share" />
			</View>

			{/* Descrição ({problem.data.Description || 'Sem descrição.'}) */}
			<Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis placerat massa ut porta.
				Ut quis viverra orci. Nunc eros tellus, ornare eget felis eu, bibendum efficitur mauris.
			</Text>

			<View style={styles.line} />
		</View>
	);
}

const styles = StyleSheet.create({
	content: {
		width: "100%",
	},
	titleContainer: {
		display: "flex",
		width: "100%",
		alignItems: "center",
		flexDirection: "row",
		marginHorizontal: 8,
		marginBottom: 7,
	},
	title: {
		fontFamily: "Poppins Bold",
		fontSize: 19,
		letterSpacing: 1.5,
		color: "#1A1A1A",
	},
	city: {
		fontFamily: "Poppins",
		color: "#ABABAB",
		fontSize: 16,
		marginLeft: 4,
	},
	menuContainer: {
		marginTop: 10,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
	description: {
		textAlign: "justify",
		color: "#1A1A1A",
		fontSize: 12.5,
		marginHorizontal: 12,
		marginTop: 10,
	},
	line: {
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ABABAB",
		marginHorizontal: 8,
	},
})

export default Item;
