import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import Button from "./Button";
import { useDetails } from "../../../contexts/DetailsContext";
import share from "../utils/share";

import itemStyle from "../styles/feedItem";

function Item(props) {
	const data = props.data.data;
	const { setDetails, setVisible } = useDetails();

	function openDatais() {
		setDetails(props.data);
		setVisible(true);
	}

	function createComment(){
		setDetails({...props.data, createComment: true});
		setVisible(true);
	}

	function menuComponent() {
		return (
			<View View style={itemStyle.menuContainer} >
				<Button icon="arrow-up" onPress={() => {}} />
				<Button icon="arrow-down" onPress={() => {}} />
				<Button icon="message-circle" onPress={() => createComment()} />
				<Button icon="share" onPress={() => share(props.data)} />
			</View>
		);
	}

	function descriptionComponent(margin) {
		return (
			<TouchableOpacity TouchableOpacity onPress={openDatais} >
				<Text style={margin ? itemStyle.description : { ...itemStyle.description, marginTop: -20 }}
					numberOfLines={2} ellipsizeMode="tail">
					{data.Description || 'Sem descrição.'}
				</Text>
			</TouchableOpacity>
		);
	}

	function returnComponents() {
		if (props.data.images.length == 0) {
			return (
				<>
					{descriptionComponent(false)}
					{menuComponent()}
				</>
			);
		} else {
			return (
				<>
					{menuComponent()}
					{descriptionComponent(true)}
				</>
			);
		}
	}

	return (
		<View style={styles.content}>
			{/* Título e cidade */}
			<TouchableOpacity style={itemStyle.titleContainer} onPress={openDatais}>
				<Text style={itemStyle.title}>{data.Title}</Text>

				{ data.City ? (
					<Text style={{...itemStyle.city, marginBottom: 10}}>{data.City}</Text>
				) : <View style={{marginBottom: 15}} /> }
			</TouchableOpacity>

			{/* Imagens */}
			<SliderBox
				images={props.data.images}

				dotColor="#F8773B"
				imageLoadingColor="#F8773B"
				sliderBoxHeight={230}
			/>

			{returnComponents()}

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
