import React from "react";
import { ScrollView, View } from "react-native";

function PageScrollView(props) {
	return(
		<ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
			<View style={{ marginTop: 10, marginHorizontal: 6, flex: 1 }}>
				{ props.children }
			</View>
		</ScrollView>
	);
}

export default PageScrollView;
