import React from "react";
import { Modal, View, StyleSheet, ActivityIndicator } from "react-native";

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
		backgroundColor: "rgba(229, 229, 229, 0.8)",
		
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	}
})

export default LockPage;
