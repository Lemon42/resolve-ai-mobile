import React from "react";
import { Modal, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import Icon from "react-native-vector-icons/FontAwesome5";
import Button from "./List/components/Button";
import share from "./List/utils/share";
import { useDetails } from "../contexts/DetailsContext";

import itemStyle from "./List/styles/feedItem";

function Detail(props) {
	const { setVisible } = useDetails();

	const images = [
		"https://s2.glbimg.com/BXoCVbSSUMqwk8SrldbMK3pYYbg=/0x0:1280x960/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2018/1/p/JbO1BoTCu5FmmTAWCQvA/cratera-joao-pessoa-bayeux.jpg",
		"https://www.acritica.com/uploads/news/image/741937/show_buraco.jpeg",
		"https://midias.gazetaonline.com.br/_midias/jpg/2018/11/12/buraco1-5873723.jpg",
	];

	function hide(){
		setVisible(false);
	}

	return (
		<Modal visible={props.isVisible} transparent animationType={"slide"} onRequestClose={hide}>
			<View style={styles.content}>
				{/* Header */}
				<View style={styles.header}>
					<TouchableOpacity style={{ width: "20%" }} onPress={hide}>
						<Icon name="caret-left" size={19} color="#1A1A1A" />
					</TouchableOpacity>

					<View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "60%" }}>
						<Text style={styles.headerTitle}>Problema</Text>
					</View>

					<View style={{ width: "20%" }}></View>
				</View>

				{/* Título */}
				<View style={{ ...itemStyle.titleContainer, marginTop: 20 }}>
					<Text style={itemStyle.title}>Buraco na rua</Text>
					<Text style={itemStyle.city}>Jundiaí</Text>
				</View>

				{/* Imagens */}
				<SliderBox
					images={images}

					dotColor="#F8773B"
					imageLoadingColor="#F8773B"
					sliderBoxHeight={270}
				/>

				{/* Menu */}
				<View style={itemStyle.menuContainer}>
					<Button icon="arrow-up" />
					<Button icon="arrow-down" />
					<Button icon="message-circle" />
					<Button icon="share" onPress={() => share()} />
				</View>

				{/* Descrição */}
				<Text style={{...itemStyle.description, fontSize: 13}}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis placerat massa ut porta.
					Ut quis viverra orci. Nunc eros tellus, ornare eget felis eu, bibendum efficitur mauris.
				</Text>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		backgroundColor: "#fff",
		display: "flex",
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",

		paddingVertical: 13,
		paddingHorizontal: 18,

		borderBottomWidth: 1,
		borderColor: "#1A1A1A",

		shadowOffset: { width: 10, height: 10 },
		shadowColor: 'black',
		shadowOpacity: 1,
		elevation: 3,
	},
	headerTitle: {
		fontFamily: "Poppins Bold",
		letterSpacing: 0.5,
		fontSize: 15,
	},
});

export default Detail;
