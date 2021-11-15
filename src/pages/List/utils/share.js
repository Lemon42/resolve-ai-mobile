import { Share } from "react-native";

const onShare = async (data) => {
	try {
		let options = {
			message: `Nós ajude a compartilhar o problema '${data.data.Title}'. Saiba mais pelo aplicativo ResolveAi!`
		};

		await Share.share(options);
	} catch (error) {
		alert(error.message);
	}
};

export default onShare;
