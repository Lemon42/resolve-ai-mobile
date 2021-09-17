import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import Button from "./Button";
import { useDetails } from "../../../contexts/DetailsContext";

import itemStyle from "../styles/feedItem";

function Item(props) {
	const { setVisible } = useDetails();

	const images = [
		"https://s2.glbimg.com/BXoCVbSSUMqwk8SrldbMK3pYYbg=/0x0:1280x960/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2018/1/p/JbO1BoTCu5FmmTAWCQvA/cratera-joao-pessoa-bayeux.jpg",
		"https://www.acritica.com/uploads/news/image/741937/show_buraco.jpeg",
		"https://midias.gazetaonline.com.br/_midias/jpg/2018/11/12/buraco1-5873723.jpg",
	];

	function openDatais(){
		setVisible(true);
	}

	return (
		<View style={styles.content}>
			{/* Título */}
			<TouchableOpacity style={itemStyle.titleContainer} onPress={openDatais}>
				<Text style={itemStyle.title}>Buraco na rua</Text>
				<Text style={itemStyle.city}>Jundiaí</Text>
			</TouchableOpacity>

			{/* Imagens */}
			<SliderBox
				images={images}

				dotColor="#F8773B"
				imageLoadingColor="#F8773B"
				sliderBoxHeight={230}
			/>

			{/* Menu */}
			<View style={itemStyle.menuContainer}>
				<Button icon="arrow-up" />
				<Button icon="arrow-down" />
				<Button icon="message-circle" />
				<Button icon="share" />
			</View>

			{/* Descrição ({problem.data.Description || 'Sem descrição.'}) */}
			<TouchableOpacity onPress={openDatais}>
				<Text style={itemStyle.description} numberOfLines={2} ellipsizeMode="tail">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis placerat massa ut porta.
					Ut quis viverra orci. Nunc eros tellus, ornare eget felis eu, bibendum efficitur mauris.
				</Text>
			</TouchableOpacity>

			<View style={styles.line} />
		</View>
	);
}

const styles = StyleSheet.create({
	content: {
		width: "100%",
		marginBottom: 20,
	},
	line: {
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ABABAB",
		marginHorizontal: 8,
	},
})

export default Item;
