import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

// Pages
import ListPage from "../pages/List";
import Map from "../pages/Map";
import CreateProblem from "../pages/CreateProblem";
import UserPage from "../pages/User";
import GalleryPage from "../pages/Gallery";

const Tab = createBottomTabNavigator();

function AppTab() {
	return (
		<Tab.Navigator screenOptions={({ route }) => ({
			tabBarIcon: ({ color, size }) => {
				let iconName;

				switch (route.name) {
					case 'List':
						iconName = 'list';
						break;
					case 'Map':
						iconName = 'map';
						break;
					case 'Post':
						iconName = 'plus-circle';
						break;
					case 'Gallery':
						iconName = 'check-square';
						break;
					case 'User':
						iconName = 'user';
						break;
				}

				return <Icon name={iconName} size={31} color={color} />;
			},
		})}
			tabBarOptions={{
				activeTintColor: "#fff",
				inactiveTintColor: "#444747",
				activeBackgroundColor: "#F8773B",
				inactiveBackgroundColor: "#FFF",
				showLabel: false,
			}}

			initialRouteName="Map"
		>
			<Tab.Screen name="List" component={ListPage} />
			<Tab.Screen name="Map" component={Map} />
			<Tab.Screen name="Post" component={CreateProblem} />
			<Tab.Screen name="Gallery" component={GalleryPage} />
			<Tab.Screen name="User" component={UserPage} />
		</Tab.Navigator>
	);
}

export default AppTab;
