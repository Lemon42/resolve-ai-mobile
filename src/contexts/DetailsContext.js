import React, { createContext, useContext, useState } from "react";

const DetailsContext = createContext();

export default function detailsProvider(props) {
	const [details, setDetails] = useState({});
	const [detailsVisible, setVisible] = useState(false);

	return (
		<DetailsContext.Provider value={{ details, setDetails, detailsVisible, setVisible }}>
			{props.children}
		</DetailsContext.Provider>
	);
}

export function useDetails() {
	const context = useContext(DetailsContext);
	const { details, setDetails, detailsVisible, setVisible } = context;

	return { details, setDetails, detailsVisible, setVisible };
}
