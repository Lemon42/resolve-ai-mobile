import { StyleSheet } from "react-native";

const style = StyleSheet.create({
	container: {
		width: 120,
		height: 90,
		display: "flex",
		alignItems: "flex-end",
		
		marginTop: 8,
	},
	removeImageButton: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		
		width: 23,
		height: 23,
		marginTop: -8,
		marginRight: -4,
		paddingBottom: 1,

		backgroundColor: "#F53455",
		borderRadius: 900,
	},
	image: {
		width: 112,
		height: 82,
		borderRadius: 11,
		position: "absolute",
	},
});

export default style;
