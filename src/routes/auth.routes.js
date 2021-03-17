import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Pages
import FrontPage from '../pages/FrontPage';
import CreateAccount from '../pages/CreateAccount';
import SignIn from '../pages/SignIn';

const Stack = createStackNavigator();

function AuthStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="FrontPage" component={FrontPage} />
			<Stack.Screen name="CreateAccount" component={CreateAccount} />
			<Stack.Screen name="SignIn" component={SignIn} />
		</Stack.Navigator>
	);
}

export default AuthStack;
