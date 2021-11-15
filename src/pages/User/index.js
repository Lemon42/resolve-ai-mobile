import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image, Alert, Linking } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { useAccount } from '../../contexts/AccountContext';

import PageScrollView from "../../components/PageScrollView";

function UserPage() {

	const { account, signOut } = useAccount();

	function logOut() {
		return Alert.alert(
			"Você realmente deseja encerrar a sessão?",
			"Será preciso fazer login novamente para acessar o aplicativo.",
			[
				{
					text: "Sim.",
					onPress: () => {
						signOut();
					},
				},
				{
					text: "Não.",
				},
			]
		);
	}

	function sendEmail() {
		return Linking.openURL('mailto:resolveaidevs@outlook.com')
	}

	return (
		<PageScrollView viewStyle={{ marginTop: 0 }}>
			<View style={styles.header}>
				<View style={styles.headerTop}>
					<Image style={styles.image} source={{ uri: account.picture }} />
					<Text style={styles.name}>{account.name}</Text>
				</View>

				<View style={styles.headerBottom}>
					<View style={styles.headerBottomLeft}>
						<View style={styles.info}>
							<Text style={styles.infoTitle}>50</Text>
							<Text style={styles.infoLabel}>Denúncias</Text>
						</View>
						<View style={{ ...styles.info, marginLeft: 13 }}>
							<Text style={styles.infoTitle}>42</Text>
							<Text style={styles.infoLabel}>Interações</Text>
						</View>
					</View>

					<View style={styles.headerBottomRight}>
						<TouchableOpacity style={styles.editPicture}>
							<Text style={styles.editPictureText}>EDITAR FOTO</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<View style={styles.divider} />

			<View style={styles.body}>
				<Text style={styles.title}>Opções</Text>
				<TouchableOpacity style={styles.option} onPress={() => logOut()}>
					<Icon name="log-out" size={17} />
					<Text style={styles.optionText}>Finalizar sessão</Text>
				</TouchableOpacity>
				<View style={styles.line} />
				<TouchableOpacity style={styles.option} onPress={() => sendEmail()}>
					<Icon name="mail" size={17} />
					<Text style={styles.optionText}>Contato com os desenvolvedores</Text>
				</TouchableOpacity>

				<Text style={{ ...styles.title, marginTop: 15 }}>Informações</Text>
				<View style={styles.option}>
					<Icon name="info" size={17} />
					<Text style={styles.optionText}>Aviso legal</Text>
				</View>
				<View style={styles.line} />
				<View style={styles.option}>
					<Icon name="code" size={17} />
					<Text style={styles.optionText}>Versão BETA 0.9.1</Text>
				</View>
				<View style={styles.line} />
				<View style={styles.option}>

					<Text style={{ ...styles.optionText, marginRight: 0 }}>Trabalho técnico para instituição Etec Vasco Antônio Venchiarutti.</Text>
				</View>

				<View style={styles.easterEgg}>
					<Text style={styles.easterEggText}>feito com JavaScript e {'\u{2665}'}</Text>
				</View>
			</View>
		</PageScrollView>
	);
}

const styles = StyleSheet.create({
	header: {
		width: "100%",
		backgroundColor: "#F8773B",
		paddingVertical: 20,
		paddingHorizontal: 15,
		paddingBottom: 80
	},
	headerTop: {
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
	},
	image: {
		height: 70,
		width: 70,
		borderRadius: 90,
		marginRight: 15
	},
	name: {
		fontFamily: "Poppins Bold",
		fontSize: 20,
		color: "#fff"
	},
	headerBottom: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",

		marginTop: 20,
	},
	headerBottomLeft: {
		display: "flex",
		flexDirection: "row",
	},

	info: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	infoTitle: {
		fontFamily: "Poppins Bold",
		color: "#fff",
		fontSize: 19,
		marginVertical: 10,
	},
	infoLabel: {
		fontFamily: "Poppins",
		color: "#fff",
		fontSize: 12,
	},

	editPicture: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",

		borderWidth: 1,
		borderColor: "#fff",
		paddingVertical: 7,
		paddingHorizontal: 7,
		borderRadius: 3,
	},
	editPictureText: {
		color: "#fff",
	},

	divider: {
		marginTop: -50,
		paddingTop: 25,
		paddingBottom: 5,
		backgroundColor: "#fff",
		borderTopRightRadius: 90,
		borderTopLeftRadius: 90,
	},
	body: {
		paddingHorizontal: 15,
		backgroundColor: "#fff",
	},

	title: {
		fontFamily: "Poppins Bold",
		color: "#1A1A1A",
		fontSize: 17,
		marginBottom: 5,
	},
	option: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	optionText: {
		fontFamily: "Poppins",
		color: "#1A1A1A",
		fontSize: 15,
		marginTop: 2,
		paddingTop: 1,
		marginLeft: 5,
	},
	line: {
		marginVertical: 10,
		borderTopWidth: 1,
		borderColor: "#ABABAB"
	},

	easterEgg: {
		marginTop: 13,
		marginBottom: 15,

		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	easterEggText: {
		fontFamily: "Poppins",
		fontSize: 12,
		color: "#ABABAB",
	}
})

export default UserPage;
