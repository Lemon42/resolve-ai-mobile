import React from 'react';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

import { useAccount } from '../contexts/AccountContext';

function Routes() {

	const { account } = useAccount();

	return (
		<>
			{
				!account.token ? (<AuthRoutes />) : (<AppRoutes />)
				
			}
		</>
	);
}

export default Routes;
