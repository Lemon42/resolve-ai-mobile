import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, FlatList, SafeAreaView, LogBox } from "react-native";

import ImagePicker from "react-native-image-crop-picker";
import Icon from "react-native-vector-icons/FontAwesome5";
import Thumbnail from "./Thumbnail";

import styles from "./styles/input";

// Deve conter em suas props: 
// 1 state chamado images, que deve ser iniciado com um array vazio
// 1 setState chamado setImages

function MultipleImagesInput(props) {

	const [error, setError] = useState(false);

	function getImages() {
		ImagePicker.openPicker({
			multiple: true,
			mediaType: "photo",
			maxFiles: 5,
			includeBase64: true,
		}).then(images => {
			if (images.length > 5) {
				setError(true);
			} else {
				setError(false);
				props.setImages(images);
			}
		}).catch(e => {
			console.log(e);
		});
	}

	const GenerateThumbnail = (image, index) => (
		<Thumbnail
			image={image} index={index}
			images={props.images} setImages={props.setImages}
		/>
	);

	const keyExtractor = (item, index) => String(index);

	useEffect(() => {
		LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
	}, []);

	return (
		<View style={{ marginTop: 15 }}>
			{props.images.length == 0 ?
				( // Sem imagens
					<View>
						<TouchableOpacity onPress={() => getImages()} style={styles.getImagesButton}>
							<Icon
								name={"images"}
								color="#919191"
								size={70}
							/>
						</TouchableOpacity>
						{
							error ? (<Text style={styles.errorMessage}>Nós só aceitamos 5 imagens</Text>) : null
						}
					</View>
				) : ( // Com imagens
					<SafeAreaView style={{flex: 1 }}>
						<FlatList
							data={props.images}
							renderItem={({ item, index }) => GenerateThumbnail(item, index)}
							keyExtractor={keyExtractor}

							contentContainerStyle={styles.flatListContent}
							style={styles.flatListContainer}
							numColumns={3}
						/>

						<TouchableOpacity onPress={() => props.setImages([])} style={styles.clearImagesButton}>
							<Text style={styles.clearImagesText}>Remover todas as imagens</Text>
						</TouchableOpacity>
					</SafeAreaView>
				)
			}
		</View>
	);
}

export default MultipleImagesInput;
