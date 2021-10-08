import React from "react";
import { Modal, View, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from "react-native";

import { useDetails } from "../../../contexts/DetailsContext";

function ProblemMenu(props) {
	const { setVisible, setDetails } = useDetails();
	let problem = props.problem;

	// Testar se a prop não está vazia, caso estiver ele vai ocasionar um erro ao renderizar o componente
	function isEmpty(obj) {
		return Object.keys(obj).length === 0;
	}

	function openProblem(){
		setDetails(problem);
		setVisible(true);
	}

	if (!isEmpty(problem)) {
		return (
			<Modal visible={props.visible} animationType={"slide"} transparent>
				<View style={styles.container}>
					<View style={styles.wrapper}>
						<Text style={styles.title}>{problem.data.Title || ''}</Text>
						{
							problem.images.length >= 1
								? (<Image style={styles.image} source={{uri: problem.images[0]}} />)
								: null
						}
						<Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">{problem.data.Description || 'Sem descrição.'}</Text>

						<TouchableOpacity onPress={openProblem} style={styles.moreContainer}>
							<Text style={styles.more}>Ver mais</Text>
						</TouchableOpacity>
					</View>

					<TouchableOpacity onPress={() => props.setVisible(false)} style={{ ...styles.wrapper, marginTop: 15 }}>
						<Text style={styles.close}>Fechar</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		);
	} else {
		return null;
	}
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		width: "100%",
		height: "100%",
		padding: 12,
		backgroundColor: "rgba(229, 229, 229, 0.8)",

		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	wrapper: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 8,

		borderRadius: 15,
		backgroundColor: "white",

		shadowOffset: { width: 5, height: 5, },
		shadowColor: 'black',
		shadowOpacity: 1.0,
		elevation: 2,
	},
	title: {
		fontFamily: "Poppins Bold",
		fontSize: 19,
		marginTop: 10,
	},
	description: {
		textAlign: "justify",
		color: "#1A1A1A",
		fontSize: 12.5,
	},
	moreContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 15,

		borderColor: "rgba(171, 171, 171, 0.5)",
		borderTopWidth: 1.5,
	},
	more: {
		color: "#F8773B",
		fontFamily: "Poppins Bold",
		fontSize: 18,
		paddingVertical: 12,
	},
	close: {
		color: "#F53455",
		fontFamily: "Poppins Bold",
		fontSize: 17,
		padding: 12,
		letterSpacing: 1,
	},
	image: {
		marginTop: 15,
		marginBottom: 15,
		width: "100%",
		height: Dimensions.get('window').height / 3,
		borderRadius: 7,
	}
})

export default ProblemMenu;
