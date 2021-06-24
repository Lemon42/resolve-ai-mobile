import { StyleSheet, Dimensions } from "react-native";

const dimensions = Dimensions.get("window");

const style = StyleSheet.create({
	container: {
		width: 80,
		height: 80,
		flexGrow: 0,
		margin: 5,
		marginTop: 15,
	},
	wrapper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
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
		width: 80,
		height: 80,
		borderRadius: 11,
		position: "absolute",
	},
});

export default style;
