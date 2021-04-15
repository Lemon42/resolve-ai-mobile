import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AccountContext = createContext();

export default function AccountProvider(props) {
	const [account, setAccount] = useState({});

	// Checagem inicial do APP
	useEffect(() => {
		async function loadStorageData() {
			const storageEmail = await AsyncStorage.getItem("@email");
			const storageToken = await AsyncStorage.getItem("@token");

			if (storageEmail && storageToken) {
				const response = await axios.post("http://192.168.1.116:3333/validate", {
					token: storageToken,
					email: storageEmail,
				}).then((response) => {
					if(!response.data.error){
						setAccount({
							token: storageToken,
							email: storageEmail,
							...response.data
						});
					}

					return;
				})
			}
		}
		loadStorageData();
	}, []);

	async function singIn(userEmail, userPass) {
		const response = await axios
			.post("http://192.168.1.116:3333/login", {
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
