import React from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";

import Figure from "../../assets/svgs/marker.svg";

function MapDetail(props) {
	return (
		<View style={styles.container}>
			<View style={styles.wrapper}>
				<MapView
					style={{ flex: 1 }}
					initialRegion={{
						...props.location,
						latitudeDelta: 0.0143,
						longitudeDelta: 0.0134
					}}
					showsUserLocation={false}
					loadingEnabled
				>
					<MapView.Marker coordinate={props.location}>
						<View style={{ width: 45, height: 45, display: "flex", alignItems: "center", justifyContent: "center" }}>
							<Figure width={45} height={45} color="#F8773B" />
						</View>
					</MapView.Marker>
				</MapView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		height: 250,
		marginTop: 15,
	},
	wrapper: {
		flex: 1,
		overflow: 'hidden',
		borderRadius: 7,
		marginHorizontal: 7,
	}
});

export default MapDetail;
