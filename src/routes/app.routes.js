import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Pages
import Map from '../pages/Map';

const Stack = createStackNavigator();

function AppStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Map" component={Map} />
		</Stack.Navigator>
	);
}

export default AppStack;
