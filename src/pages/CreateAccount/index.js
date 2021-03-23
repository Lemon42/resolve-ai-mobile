import React from "react";
import {
	View,
	SafeAreaView,
	ScrollView,
	Text,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

// Components
import Input from "../../components/Input";

// Assets
import Figure from "../../assets/svgs/figure1.svg";

function CreateAccount({ navigation }) {
	return (
		<SafeAreaView>
			<ScrollView>
				<View style={styles.container}>
					<View style={{ display: "flex", width: "100%", marginLeft: 35 }}>
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Icon
								name={"long-arrow-alt-left"}
								color="#D6D6D6"
								size={35}
							/>
						</TouchableOpacity>
					</View>
					<Text style={styles.title}>Crie uma conta</Text>
					<Figure width={230} height={150} style={{ marginBottom: -25 }} />
					<View style={styles.wrapper}>
						<Input label="Nome:" />
						<Input label="Email:" />
						<Input label="Cidade:" />
						<Input label="Senha:" />
						<Input label="Confirme sua senha:" />

						<TouchableOpacity
							onPress={() => navigation.navigate('SignIn')}
							style={{
								display: "flex",
								justifyContent: "center",
								flexDirection: "row",
							}}
						>
							<Text style={styles.backButton}>Já tem uma conta? </Text>
							<Text
								style={{
									...styles.backButton,
									fontFamily: "Poppins Bold",
								}}
							>
								Faça login.
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 8,
	},
	wrapper: {
		width: "100%",
		marginTop: 55,
		paddingHorizontal: 22,
	},
	title: {
		marginTop: -2,
		marginBottom: 10,
		fontFamily: "Poppins Bold",
		letterSpacing: 0,
		fontSize: 25,
		color: "#F8773B",
		textAlign: "center",
	},
	backButton: {
		fontFamily: "Poppins",
		fontSize: 14,
		color: "#919191",
		textAlign: "center",
		marginBottom: 25,
	},
});

export default CreateAccount;
