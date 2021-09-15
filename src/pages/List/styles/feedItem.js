import { StyleSheet } from "react-native";

const item = StyleSheet.create({
	titleContainer: {
		display: "flex",
		width: "100%",
		justifyContent: "center",
		flexDirection: "column",
		marginHorizontal: 8,
		marginBottom: 7,
	},
	title: {
		fontFamily: "Poppins Bold",
		fontSize: 19,
		letterSpacing: 1.5,
		color: "#1A1A1A",
	},
	city: {
		fontFamily: "Poppins",
		color: "#ABABAB",
		fontSize: 16,
		marginTop: -7,
	},
	menuContainer: {
		marginTop: 10,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
	description: {
		textAlign: "justify",
		color: "#1A1A1A",
		fontSize: 12.5,
		marginHorizontal: 12,
		marginTop: 10,
	},
})

export default item;
