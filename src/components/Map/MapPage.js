import React, { useState, useEffect } from "react";
import { View, Platform } from "react-native";

import MapView from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import axios from "axios";

import { API_URL } from "@env";
import { useAccount } from '../../contexts/AccountContext';

function Map(props) {
	const [region, setRegion] = useState(false);
	const [problems, setProblems] = useState([]);

	const { account } = useAccount();

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
						options = { ...options, headers: { city: responseCity }};
					})
					.catch((error) => {
						console.log(error);
					});
	
				axios.request(options)
					.then((response) => {
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

	return (
		<View style={{ flex: 1 }}>
			<View style={{ flex: 1, overflow: 'hidden' }}>
				<MapView
					style={{ flex: 1 }}
					initialRegion={region}
					showsUserLocation
					loadingEnabled
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
