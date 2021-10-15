import React, { useState, useEffect, useRef } from "react";
import {
	Modal, View,
	StyleSheet, Text,
	TouchableOpacity, ScrollView,
	TextInput, Image,
	Dimensions
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";

import Button from "./Button";
import share from "../utils/share";
import { useDetails } from "../../../contexts/DetailsContext";
import MapDetail from "../../../components/Map/MapDetail";
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

	const createCommentRef = useRef(null);
	const scrollView = useRef(null);
	const commentInput = useRef(null);

	const { account } = useAccount();
	const [comments, setComments] = useState([]);
	const [location, setLocation] = useState({ latitude: -23.1616483, longitude: -46.9271227 });
	const [newComment, setNewComment] = useState("");
	const { details, setVisible } = useDetails();
	const [refresh, setRefresh] = useState(true);

	// Configuração para requisição
	const options = {
		headers: {
			token: account.token,
			email: account.email,
		}
	};

	function hide() {
		setRefresh(!refresh);
		setVisible(false);
	}

	// Atualizando comentarios e mapa
	if (refresh) {
		// Passando lat e lon para float
		setLocation({
			latitude: parseFloat(details.data.Latitude),
			longitude: parseFloat(details.data.Longitude)
		});

		// Pesquisar pelos comentarios
		if (details.data.ID != "0") {
			axios.get(`${API_URL}/comment/${details.data.ID}`, options)
				.then(response => setComments(response.data.comments))
				.catch(error => console.log(error));
		}

		setRefresh(!refresh);
	}

	if (!didMount) {
		return null;
	}

	function createComment() {
		if (newComment == "") {
			alert("Você deve escrever um comentário.");
			return;
		}

		axios.post(`${API_URL}/create-comment/`,
			{ problemId: details.data.ID, content: newComment }, options)
			.then(response => {
				let comment = {
					id: response.data.id,
					email: account.email,
					name: account.name,
					picture: account.picture,
					content: newComment
				};

				setNewComment("");
				setComments([comment, ...comments]);
				commentInput.current.clear();
			})
			.catch(err => {
				console.log(err);
				alert("Ops! Tivemos um erro o tentar criar o comentario :(");
			});
	}

	function goToComment() {
		if (createCommentRef.current) {
			createCommentRef.current.measureInWindow((x, y) => {
				scrollView.current.scrollTo({ y: y, animated: true });
				setTimeout(() => { commentInput.current.focus() }, 650);
			});
		} else {
			alert("Ops! Tivemos um erro.");
		}
	}

	return (
		<Modal visible={props.isVisible} transparent animationType={"slide"} onRequestClose={hide}>
			<ScrollView style={{ backgroundColor: '#fff', flex: 1, }} ref={scrollView}>
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
						<Button icon="message-circle" onPress={() => goToComment()} />
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
						<View
							style={styles.createCommentContainer}
							ref={createCommentRef}
							onLayout={e => {
								createCommentRef.current.measureInWindow((x, y) => {
									console.log(y);
								});
							}}>
							<Image source={{ uri: account.picture }} style={styles.createCommentImage} />
							<View style={styles.inputContainer}>
								<TextInput 
									ref={commentInput} onChangeText={(text) => setNewComment(text)}
									placeholder="Digite um comentario" style={styles.commentInput}
									placeholderTextColor="#B4B6B8"
								/>
							</View>
							<View style={styles.buttonContainer}>
								<TouchableOpacity onPress={() => createComment()} style={{ paddingHorizontal: 8 }}>
									<Icon name="paper-plane" size={23} color="#1A1A1A" />
								</TouchableOpacity>
							</View>
						</View>
						{
							comments.map((comment, i) =>
								<Comment data={comment} problemId={details.data.ID} key={i} />
							)
						}
					</View>
				</View>
			</ScrollView>
		</Modal>
	);
}

const screenWidth = Dimensions.get('window').width;

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
	createCommentContainer: {
		maxWidth: screenWidth - 22, // tamanho da tela - padding padrão
		display: "flex",
		flexDirection: "row",

		marginTop: 50,
		marginBottom: 18,
		paddingBottom: 25,

		borderBottomWidth: 2,
		borderColor: "#E3E6E8",
	},
	createCommentImage: {
		width: 41,
		height: 41,
		borderRadius: 90,
	},
	inputContainer: {
		position: "relative",
		marginLeft: 11,
		width: screenWidth - 22 - 44 - 11 - 31, // tela - padding - imagem - margin - botão
	},
	commentInput: {
		width: "100%",
		marginLeft: 0,

		color: "#000",
		backgroundColor: "#fff",

		borderWidth: 1,
		borderColor: "#E3E6E8",
		borderRadius: 7,
	},
	buttonContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	}
});

export default Detail;
