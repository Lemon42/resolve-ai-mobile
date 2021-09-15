import { Share } from "react-native";

const onShare = async (props) => {
	try {
		await Share.share({
			message:
				`Mensagem ${props.salve}`,
		});
	} catch (error) {
		alert(error.message);
	}
};

export default onShare;
