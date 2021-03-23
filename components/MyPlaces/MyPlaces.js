import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';  
import MyPlacesHome from "./components/MyPlaces/MyPlacesHome.js"
import MyPlacesMap from "./components/MyPlaces/MyPlacesMap.js"

export default function MyPlaces() {
  
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;
  
      if (route.name === 'Place List') {
        iconName = 'md-home';
      } else if (route.name === 'Map') {
        iconName = 'md-map';
      }
  
      return <Ionicons name={iconName} size={size} color={color} />;
    }
  });

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name='Place List' component={MyPlacesHome} />
        <Tab.Screen name="Map" component={MyPlacesMap} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
