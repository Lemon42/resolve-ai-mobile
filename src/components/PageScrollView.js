import React from "react";
import { ScrollView, View } from "react-native";

function PageScrollView(props) {
	return(
		<ScrollView style={{ backgroundColor: '#fff', flex: 1, ...props.style }}>
			<View style={{ marginTop: 10, flex: 1, ...props.viewStyle }}>
				{ props.children }
			</View>
		</ScrollView>
	);
}

export default PageScrollView;
