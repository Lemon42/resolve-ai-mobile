import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AccountContext = createContext();

import { API_URL } from "@env";

export default function AccountProvider(props) {
	const [account, setAccount] = useState({});

	// Checagem inicial do APP
	useEffect(() => {
		async function loadStorageData() {
			const storageEmail = await AsyncStorage.getItem("@email");
			const storageToken = await AsyncStorage.getItem("@token");

			if (storageEmail && storageToken) {
				const response = await axios
					.post(`${API_URL}/validate`, {
						token: storageToken,
						email: storageEmail,
					})
					.then((response) => {
						if (!response.data.error) {
							setAccount({
								token: storageToken,
								email: storageEmail,
								...response.data,
							});
						}

						return;
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}
		
		loadStorageData();
	}, []);

	async function singIn(userEmail, userPass) {
		const response = await axios
			.post(`${API_URL}/login`, {
				email: userEmail,
				pass: userPass,
				type: "mobile",
			})
			.then(async (response) => {
				if (response.data.error) {
					return response.data.error;
				}

				await AsyncStorage.setItem("@email", response.data.email);
				await AsyncStorage.setItem("@token", response.data.token);

				setAccount(response.data);
				return "";
			})
			.catch(() => {
				return "Ops! Tivemos um erro.";
			});

		return response;
	}

	async function signOut() {
		const email = await AsyncStorage.getItem("@email");
		const token = await AsyncStorage.getItem("@token");

		axios
			.delete(`${API_URL}/logout`, {
				data: { email: email, token: token },
			})

			await AsyncStorage.clear();
			setAccount({});
	}

	return (
		<AccountContext.Provider value={{ account, singIn, signOut }}>
			{props.children}
		</AccountContext.Provider>
	);
}

export function useAccount() {
	const context = useContext(AccountContext);
	const { account, singIn, signOut } = context;

	return { account, singIn, signOut };
}
