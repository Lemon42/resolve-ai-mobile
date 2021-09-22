import React from "react";

import ScrollView from "../../components/PageScrollView";
import Item from "./components/Item";

import Details from "./components/Details";
import { useDetails } from "../../contexts/DetailsContext";

function ListPage() {
	const { detailsVisible } = useDetails();
	
	return (
		<ScrollView>
			<Item />

			<Details isVisible={detailsVisible} />
		</ScrollView>
	);
}

export default ListPage;
