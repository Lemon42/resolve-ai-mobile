import React, { useState, useEffect } from "react";
import { View, Platform } from "react-native";

import MapView from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import axios from "axios";

import { API_URL } from "@env";
import { useAccount } from '../../contexts/AccountContext';

function Map(props) {
	const cityLocations = [
		{ name: "Jundiaí", lat: -23.1861268, lon: -46.8861839, },
		{ name: "Vinhedo", lat: -23.0259772, lon: -46.9825881 },
		{ name: "Várzea Paulista", lat: -23.2128808, lon: -46.829298 },
		{ name: "Campo Limpo Paulista", lat: -23.209516, lon: -46.7822868, },
		{ name: "Louveira", lat: -23.0879492, lon: -46.9502437 },
		{ name: "Cabreúva", lat: -23.3095099, lon: -47.1352511 },
	];

	const [problems, setProblems] = useState([]);

	const { account } = useAccount();
	const [region, setRegion] = useState({
		latitude: -23.1385179,
		longitude: -46.9524092,
		latitudeDelta: 0.0113,
		longitudeDelta: 0.0114
	}
	);

	// Sabendo a localização inicial do usuário
	useEffect(() => {
		if (Platform.OS === 'ios') {
			Geolocation.requestAuthorization("always");
		}

		Geolocation.getCurrentPosition(
			async (position) => {
				let { latitude, longitude } = position.coords;
				setRegion({
					latitude,
					longitude,
					latitudeDelta: 0.0143,
					longitudeDelta: 0.0134
				});

				// Quando o souber a cidade onde está o usuário buscar na API os problemas de lá
				var options = {
					method: 'GET',
					url: `${API_URL}/list-problems`,
					headers: {
						email: account.email,
						token: account.token,
						'Content-Type': 'application/json',
					},
				};

				await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
					.then((response) => {
						const responseCity = (response.data?.address?.city || response.data?.address?.city_district) ?? '';
						options = { ...options, url: `${API_URL}/list-problems/${responseCity}` };
					})
					.catch((error) => {
						console.log(error);
					});

				axios.request(options)
					.then((response) => {
						console.log(response);
						setProblems(response.data);
					})
					.catch((error) => {
						alert('Não foi possível ler os problemas cadastrados!');
						console.log(error);
					})
			},
			(error) => {
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 2000 }
		);
	}, []);


	// Caso o usuário selecionar outra cidade
	useEffect(() => {
		if (props.city) {
			cityLocations.forEach(city => {
				if (city.name == props.city) {
					const options = {
						headers: {
							email: account.email,
							token: account.token,
						}
					};

					axios.get(`${API_URL}/list-problems/${city.name}`, options)
						.then((response) => {
							setProblems(response.data);
						})
						.catch((error) => {
							console.log(error);
						})

					setRegion({
						latitude: city.lat,
						longitude: city.lon,
						latitudeDelta: 0.033,
						longitudeDelta: 0.024
					});
				}
			})
		}
	}, [props.city]);

	return (
		<View style={{ flex: 1 }}>
			<View style={{ flex: 1, overflow: 'hidden' }}>
				<MapView
					style={{ flex: 1 }}
					initialRegion={region}
					showsUserLocation
					loadingEnabled

					region={region}
				>
					{
						problems.length >= 1 ? (
							// Caso existir problemas na localidade
							problems.map((problem, index) => {
								let lat = parseFloat(problem.data.Latitude);
								let lon = parseFloat(problem.data.Longitude);

								return <MapView.Marker key={index}
									coordinate={{ latitude: lat, longitude: lon }}
									onPress={() => { props.problemOnDisplay(problem) }}
								/>
							})
						) : null
					}
				</MapView>
			</View>
		</View>
	);
}

export default Map;
