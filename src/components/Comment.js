import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";

import { API_URL } from "@env";
import { useAccount } from "../contexts/AccountContext";

function Comment(props) {
	const data = props.data;
	const [display, setDisplay] = useState("flex");
	const { account } = useAccount();

	const options = {
		headers: {
			token: account.token,
			email: account.email,
		}
	};

	const reportConfirmation = () => {
		return Alert.alert(
			"Você deseja denunciar esse comentário?",
			"Nós iremos analisar e caso seja confirmada a denúncia iremos tomar as devidas providências.",
			[
				{
					text: "Sim.",
					onPress: () => {
						axios.post(`${API_URL}/report-comment/${data.id}/problem/${props.problemId}`, {}, options)
							.catch((err) => { console.log(err) });
					},
				},
				{
					text: "Não.",
				},
			]
		);
	};

	const deleteConfirmation = () => {
		return Alert.alert(
			"Você deseja deletar esse comentário?",
			"Ele não poderá ser visto ou recuperado após isso.",
			[
				{
					text: "Sim",
					onPress: () => {
						setDisplay("none");
						axios.delete(`${API_URL}/comment/${data.id}/problem/${props.problemId}`, options)
							.catch((err) => { console.log(err) });
					},
				},
				{
					text: "Não",
				},
			]
		);
	};

	return (
		<View style={{ ...styles.wrapper, display: display }}>
			<Image source={{ uri: data.picture }} style={styles.picture} />
			<View style={{ display: "flex", alignItems: "flex-start", width: "80%" }}>
				<View style={styles.container}>
					<Text style={styles.name}>{data.name}</Text>
					<Text style={styles.content}>{data.content}</Text>
				</View>
			</View>
			{
				account.email == data.email ? (
					<TouchableOpacity onPress={() => deleteConfirmation()} style={styles.button}>
						<Icon name="trash-alt" color="#ABABAB" size={15} />
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={() => reportConfirmation()} style={styles.button}>
						<Icon name="flag" color="#ABABAB" size={13} />
					</TouchableOpacity>
				)
			}
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		width: "100%",
		marginTop: 15,
		justifyContent: "space-between",
		flexDirection: "row",

		paddingBottom: 20,
		borderBottomWidth: 1,
		borderColor: "#E3E6E8",
	},
	picture: {
		width: 41,
		height: 41,
		borderRadius: 90,
	},
	container: {
		display: "flex",
		marginLeft: 8,
		color: "#000",
		backgroundColor: "#E3E6E8",
		borderRadius: 8,

		paddingHorizontal: 8,
		paddingTop: 5,
		paddingBottom: 8,
	},
	name: {
		fontFamily: "Poppins",
		fontSize: 15,
		marginBottom: -3,
	},
	content: {
		textAlign: "justify", // funciona apenas com IOS ou Android Oreo superior
	},
	button: {
		paddingLeft: 5
	}
});

export const CommentsContainer = StyleSheet.create({
	paddingHorizontal: 11,
})

export default Comment;
