import React, { useState, useEffect } from "react";
import { 
	View,
	StyleSheet,
	TextInput,
	Text,
	TouchableOpacity,
	Dimensions,
	ActivityIndicator,
	Alert
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome5";

import ScrollView from "../../components/PageScrollView";
import Item from "./components/Item";
import Details from "./components/Details";
import CitySelect from "./components/CitySelect";

import { API_URL } from "@env";
import { useDetails } from "../../contexts/DetailsContext";
import { useAccount } from "../../contexts/AccountContext";

function ListPage() {
	const { detailsVisible } = useDetails();
	const [searching, setSearching] = useState(true);
	const [problems, setProblems] = useState([]);
	const [search, setSearch] = useState({ title: "none", city: "false", user: false });

	const { account } = useAccount();
	const options = {
		headers: {
			token: account.token,
			email: account.email,
		}
	};

	useEffect(() => {
		axios.get(`${API_URL}/list-problems`, options)
			.then((response) => setProblems(response.data))
			.catch((error) => Alert.alert("Ops, tivemos um erro!", "Não foi possivel listar os problemas cadastrados."));

		setSearching(false);
	}, []);

	function sendForm(newSearch) {
		setSearching(true);

		if (newSearch != false){
			setSearch(newSearch);
		} else {
			newSearch = search;
		}
		
		axios.get(`${API_URL}/search/${newSearch.title}/${newSearch.city}/${newSearch.user}`, options)
			.then((response) => setProblems(response.data))
			.catch(() => Alert.alert("Ops, tivemos um erro!", "Estamos trabalhando nisso."));
		
		setSearching(false);
	}

	function changeTitle(value) {
		if (value == "") {
			setSearch({ ...search, title: "none" });
		} else {
			setSearch({ ...search, title: value });
		}
	}

	return (
		<ScrollView viewStyle={{ marginTop: 0 }}>
			<View style={styles.searchContainer}>
				<Text style={styles.title}>Lista de problemas</Text>

				<View style={styles.searchBar}>
					<TextInput
						style={styles.searchInput}
						placeholder="Pesquise por um problema aqui"
						placeholderTextColor="#999"
						keyboardType="web-search"

						onChangeText={value => changeTitle(value)}
					/>
					<View style={styles.searchButtonContainer}>
						<TouchableOpacity onPress={() => sendForm(false)} style={styles.searchButton}>
							<Icon name="search" size={20} color="#FFF" />
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.optionsContainer}>
					<CitySelect value={search} sendForm={sendForm} />
					<TouchableOpacity
						style={search.user ? active.userButton : styles.userButton}
						onPress={() => sendForm({ ...search, user: !search.user })}
					>
						<Text style={search.user ? active.userButtonText : styles.userButtonText}>Castrados por você</Text>
					</TouchableOpacity>
				</View>
			</View>

			{ searching ? (
				<ActivityIndicator size="large" color="#F8773B" />
			)
			: null }

			{
				problems.map((problem, index) => <Item key={index} data={problem} />)
			}

			<Details isVisible={detailsVisible} />
		</ScrollView>
	);
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
	title: {
		color: "#F8773B",
		fontFamily: "Poppins Bold",
		fontSize: 19,
		marginBottom: 10,
	},
	searchContainer: {
		width: "100%",
		backgroundColor: "#FFF",
		paddingHorizontal: 7,
		paddingTop: 15,
		paddingBottom: 25,
		marginBottom: 15,
		elevation: 6,
	},
	searchBar: {
		height: 38,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",

		borderRadius: 5,
		elevation: 4,
	},
	searchInput: {
		paddingLeft: 10,
		width: screenWidth - 14 - 50, // tela - padding - tamanho do botão
		backgroundColor: "#fff",
		color: "#1A1A1A",

		borderRightWidth: 1,
		borderColor: "#7D7D7D",
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
	},
	searchButtonContainer: {
		width: 50,
		height: "100%",
		backgroundColor: "#F8773B",

		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
	},
	searchButton: {
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	optionsContainer: {
		display: "flex",
		flexDirection: "row",
		marginTop: 25,
		width: "100%",
	},
	userButton: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 4,
		borderWidth: 1,
		borderRadius: 4,
		borderColor: "#cccbd2",

		marginLeft: 8,
	},
	userButtonText: {
		color: "#cccbd2",
		fontFamily: "Poppins",
		fontSize: 15,
		marginBottom: -3,
	}
});

const active = StyleSheet.create({
	userButton: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 4,
		borderWidth: 1,
		borderRadius: 4,
		borderColor: "#F8773B",

		marginLeft: 8,
	},
	userButtonText: {
		color: "#F8773B",
		fontFamily: "Poppins",
		fontSize: 15,
		marginBottom: -3,
	}
});

export default ListPage;
