import { StyleSheet } from "react-native";

const style = StyleSheet.create({
	getImagesButton: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",

		paddingVertical: 25,

		borderColor: "#919191",
		borderWidth: 3,
		borderRadius: 12,
	},
	errorMessage: {
		width: "100%",
		fontFamily: "Poppins Bold",
		color: "#F53455",
		textAlign: "right",
		marginTop: 8,
		marginRight: 8,
	},
	clearImagesButton: {
		marginTop: 12,

		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: 4,

		borderWidth: 3,
		borderRadius: 7,
		borderColor: "#F53455"

	},
	clearImagesText: {
		fontFamily: "Poppins Bold",
		color: "#F53455",
	},
	imagesContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",

		backgroundColor: "yellow"
	},
});

export default style;
