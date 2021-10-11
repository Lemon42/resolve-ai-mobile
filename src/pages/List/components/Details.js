import React, { useState, useEffect } from "react";
import { Modal, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";

import Button from "./Button";
import share from "../utils/share";
import { useDetails } from "../../../contexts/DetailsContext";
import MapDetail from "../../../components/Map/MapDetail";
import PageScrollView from "../../../components/PageScrollView";
import Comment, { CommentsContainer } from "../../../components/Comment";

import itemStyle from "../styles/feedItem";

import { useAccount } from "../../../contexts/AccountContext";
import { API_URL } from "@env";

function Detail(props) {
	// Verificando se o componente já está montado
	const [didMount, setDidMount] = useState(false); 
	useEffect(() => {
		setDidMount(true);
		return () => setDidMount(false);
	}, []);

	const { account } = useAccount();
	const [comments, setComments] = useState([]);
	const [location, setLocation] = useState({ latitude: -23.1616483, longitude: -46.9271227 });
	const { details, setVisible } = useDetails();

	function hide() {
		setVisible(false);
	}

	// Atualizando comentarios e mapa
	useEffect(() => {
		// Passando lat e lon para float
		setLocation({
			latitude: parseFloat(details.data.Latitude),
			longitude: parseFloat(details.data.Longitude)
		});

		// Pesquisar pelos comentarios
		const options = {
			headers: {
				token: account.token,
				email: account.email,
			}
		};

		if (details.data.ID != "0") {
			axios.get(`${API_URL}/comment/${details.data.ID}`, options)
				.then(response => setComments(response.data.comments))
				.catch(error => console.log(error));
		}
	}, [details])

	if (!didMount) {
		return null;
	}

	return (
		<Modal visible={props.isVisible} transparent animationType={"slide"} onRequestClose={hide}>
			<PageScrollView viewStyle={{ marginTop: 0 }}>
				<View style={styles.content}>

					{/* Header */}
					<View style={styles.header}>
						<TouchableOpacity style={{ width: "20%" }} onPress={hide}>
							<Icon name="caret-left" size={19} color="#1A1A1A" />
						</TouchableOpacity>

						<View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "60%" }}>
							<Text style={styles.headerTitle}>Problema</Text>
						</View>

						<Text style={{ width: "20%" }}>{' '}</Text>
					</View>

					{/* Título */}
					<View style={{ ...itemStyle.titleContainer, marginTop: 20 }}>
						<Text style={itemStyle.title}>{details.data.Title}</Text>
						<Text style={{ ...itemStyle.city, marginTop: 0 }}>{details.data.City}</Text>
					</View>

					{/* Imagens */}
					{
						details.images.length != 0 ? (
							<SliderBox
								images={details.images}

								dotColor="#F8773B"
								imageLoadingColor="#F8773B"
								sliderBoxHeight={270}
							/>
						) : (
							<Text Text style={{ ...itemStyle.description, fontSize: 14, marginTop: -5, marginBottom: 15 }}>
								{details.data.Description}
							</Text>
						)
					}

					{/* Menu */}
					<View style={itemStyle.menuContainer}>
						<Button icon="arrow-up" />
						<Button icon="arrow-down" />
						<Button icon="message-circle" />
						<Button icon="share" onPress={() => share()} />
					</View>

					{
						details.images.length != 0 ? (
							<Text Text style={{ ...itemStyle.description, fontSize: 13 }}>
								{details.data.Description}
							</Text>
						) : null
					}

					{/* Mapa */}
					{
						details?.data?.latitude?.length != 0 ? (
							<MapDetail location={location} />
						) : null
					}

					{/* Comentarios */}
					<View style={{ width: "100%", ...CommentsContainer }}>
						{
							comments.map((comment, i) =>
								<Comment data={comment} key={i} />
							)
						}
					</View>
				</View>
			</PageScrollView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		width: "100%",
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
		letterSpacing: 0.8,
		fontSize: 17,
		color: "#F8773B",
	},
});

export default Detail;
