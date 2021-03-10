import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons} from '@expo/vector-icons';  
//import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Home from './Home';
import History from './History';

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = 'md-home';
    } else if (route.name === 'History') {
      iconName = 'timer-outline';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  }
});

const Tab = createBottomTabNavigator();

export default function PageNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="History" component={History} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
    backgroundColor: '#80CEE1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    backgroundColor: '#73d833',
  },
});


