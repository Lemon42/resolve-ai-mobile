import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import axios from "axios";
import { API_URL } from "@env";
import { useAccount } from '../../../contexts/AccountContext';

function Buttons(props) {
	const [isUp, setUp] = useState(props.initialValue);

	const { account } = useAccount();
	const options = {
		headers: {
			token: account.token,
			email: account.email,
		}
	};

	function handleRelevance(button) {
		if (button == isUp) {
			setUp(null);
		} else if (isUp == null) {
			setUp(button);
		} else {
			setUp(!isUp);
		}

		axios.post(`${API_URL}/relevance/${props.problemId}/${button}`, {}, options)
			.catch((err) => console.log(err));
	}

	return (
		<>
			<TouchableOpacity style={{ padding: 5 }} onPress={() => handleRelevance(true)}>
				<Icon name={"arrow-up"} size={25} color={isUp && isUp != null ? "#19E87F" : "#000"} />
			</TouchableOpacity>
			<TouchableOpacity style={{ padding: 5 }} onPress={() => handleRelevance(false)}>
				<Icon name={"arrow-down"} size={25} color={!isUp && isUp != null ? "#F53455" : "#000"} />
			</TouchableOpacity>
		</>
	);
}

export default Buttons;
