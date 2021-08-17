import React, { Component } from "react";
import { View, Platform } from "react-native";

import MapView from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import axios from "axios";

export default class Map extends Component {
	state = { region: null };

	constructor(props) {
		super(props)

		this.state = {
			problems: [],
			city: false,
		}
	}

	async componentDidMount() {
		if (Platform.OS === 'ios') {
			Geolocation.requestAuthorization("always");
		}

		Geolocation.getCurrentPosition(
			async (position) => {
				let { latitude, longitude } = position.coords;

				this.setState({
					region: {
						latitude,
						longitude,
						latitudeDelta: 0.0143,
						longitudeDelta: 0.0134
					}
				});

				await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
					.then((response) => {
						const responseCity = (response.data?.address?.city || response.data?.address?.city_district) ?? '';
						this.setState({ city: responseCity });
					});

				// Quando o souber a cidade onde está o usuário buscar na API os problemas de lá
				var options = {
					method: 'GET',
					url: 'http://192.168.1.191:3333/list-problems',
					headers: {
						email: 'esrdias@gmail.com',
						token: '0b75e51431ccf11d40cae7724e2ce08f',
						'Content-Type': 'application/json',
						'city': this.state.city,
					},
				};

				axios.request(options)
					.then((response) => {
						this.setState({ problems: response.data });
					})
					.catch((error) => {
						alert('Não foi possível ler os problemas cadastrados!');
					})
			},
			(error) => {
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 2000 }
		);
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<View style={{ flex: 1, overflow: 'hidden' }}>
					<MapView
						style={{ flex: 1 }}
						initialRegion={this.state.region}
						showsUserLocation
						loadingEnabled
					>
						{
							this.state.problems.length >= 1 && this.state.city ? (
								// Caso existir problemas na localidade
								this.state.problems.map((problem, index) => {
									let lat = parseFloat(problem.data.Latitude);
									let lon = parseFloat(problem.data.Longitude);

									return <MapView.Marker key={index}
										coordinate={{ latitude: lat, longitude: lon }} />
										// botão para expo Action Sheet personalizado (criar novo componente)
								})
							) : null
						}
					</MapView>
				</View>
			</View>

		);
	}
}
