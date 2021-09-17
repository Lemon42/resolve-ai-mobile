import React, { useEffect } from 'react';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

import { useAccount } from '../contexts/AccountContext';
import { useDetails } from "../contexts/DetailsContext";

import Details from "../pages/Details";

function Routes() {
	const { detailsVisible } = useDetails();
	const { account } = useAccount();

	return (
		<>
			<Details isVisible={detailsVisible} />
			{
				!account.token ? (<AuthRoutes />) : (<AppRoutes />)
			}
		</>
	);
}

export default Routes;
