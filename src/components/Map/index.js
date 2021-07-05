import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";

import MapView from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

export default class Map extends Component {
	state = { region: null };

	constructor(props) {
		super(props)

		this.state = {
			markers: []
		}
	}

	async componentDidMount() {
		if (Platform.OS === 'ios') {
			Geolocation.requestAuthorization('always');
		}

		Geolocation.getCurrentPosition(
			(position) => {
			  let {latitude, longitude} = position.coords;

			  this.setState({
				region: {
					latitude,
					longitude,
					latitudeDelta: 0.0143,
					longitudeDelta: 0.0134
				}
			});
			},
			(error) => {
			  console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
		);
	}

	render() {
		// Verificando se o componente precisa adicionar marker
		var addMarker = (e) => { };
		if (this.props.setSelectLocation) {
			addMarker = (e) => {
				this.setState({ markers: [{ latlng: e.nativeEvent.coordinate }] });
				this.props.setSelectLocation(e.nativeEvent.coordinate)
			}
		}

		return (
			<View style={{ flex: 1 }}>
				<View style={{ flex: 1, overflow: 'hidden', borderRadius: this.props.borderRadius || 0 }}>
					<MapView
						style={{ flex: 1 }}
						region={this.state.region}
						showsUserLocation
						loadingEnabled

						onPress={(e) => addMarker(e)}
					>
						{
							this.state.markers.map((marker, index) => (
								<MapView.Marker key={index} coordinate={marker.latlng} />
							))
						}
					</MapView>
				</View>
				{
					this.props.setSelectLocation ?
						(
							this.state.markers.length >= 1 ?
								(
									<TouchableOpacity
										style={styles.removeMarkerButton}
										onPress={() => {
											this.props.setSelectLocation({});
											this.setState({ markers: [] });
										}}
									>
										<Text style={styles.removeMarkerText}>Remover localização</Text>
									</TouchableOpacity>
								) : (null)
						)
						: null
				}
			</View>

		);
	}
}

const styles = StyleSheet.create({
	removeMarkerButton: {
		marginTop: 12,

		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: 4,

		borderWidth: 3,
		borderRadius: 7,
		borderColor: "#F53455"
	},
	removeMarkerText: {
		fontFamily: "Poppins Bold",
		color: "#F53455",
	},
})
