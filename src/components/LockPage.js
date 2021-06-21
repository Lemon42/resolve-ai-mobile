import React from "react";
import { Modal, View, StyleSheet, Image, ActivityIndicator } from "react-native";

function LockPage(props) {

	return (
		<Modal visible={props.isLocked} transparent animationType={"fade"} transparent={true}>
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#F8773B" />
			</View>
		</Modal>
	);

}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(100,100,100, 0.6)",
		
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	}
})

export default LockPage;
