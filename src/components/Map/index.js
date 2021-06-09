import React, { Component } from "react";
import { View, Text } from "react-native";

import MapView from "react-native-maps";
navigator.geolocation = require("@react-native-community/geolocation");

export default class Map extends Component {
	state = { region: null };

	async componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			async ({ coords: { latitude, longitude } }) => {
				this.setState({
					region: {
						latitude,
						longitude,
						latitudeDelta: 0.0143,
						longitudeDelta: 0.0134
					}
				});
			}, //sucesso
			(error) => {
				error = JSON.stringify(error)
				console.log('-->' + error);
			}, //erro
			{
				timeout: 2000,
				enableHighAccuracy: true
			}
		);
	}

	render() {
		const { region } = this.state;

		return (
			<View style={{ flex: 1 }}>
				<MapView
					style={{ flex: 1 }}
					region={region}
					showsUserLocation
					loadingEnabled
				>
				</MapView>
				<View
					style={{
						position: 'absolute',//use absolute position to show button on top of the map
						top: '90%', //for center align
						alignSelf: 'flex-end' //for align to right
					}}
				>
					<Text>salve</Text>
				</View>
			</View>
		);
	}
}
