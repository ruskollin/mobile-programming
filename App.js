import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons} from '@expo/vector-icons';   

import Home from './components/Home';
import History from './components/History';
import Calculator from './components/Calculator';
import CalculatorHistory from './components/CalculatorHistory';
import CurrencyConverter from './components/CurrencyConverter';
import JobSearch from './components/JobSearch';
import Location from './components/Location';
import MapFinder from './components/MapFinder';
import Maps from './components/Maps';
import NumberGuessingGame from './components/NumberGuessingGame';
import PageNavigation from './components/PageNavigation';
import RecipeFinder from './components/RecipeFinder';
import ShoppingDatabase from './components/ShoppingDatabase';
import ShoppingFirebase from './components/ShoppingFirebase';
import ShoppingList from './components/ShoppingList';

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

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name = "Home" component={Home} />
        <Stack.Screen name = "Calculator" component={Calculator} />
        <Stack.Screen name = "Calculator with History" component={CalculatorHistory} />
        <Stack.Screen name = "Currency Converter" component={CurrencyConverter} />
        <Stack.Screen name = "Job Search" component={JobSearch} />
        <Stack.Screen name = "Location" component={Location} />
        <Stack.Screen name = "Maps" component={Maps} />
        <Stack.Screen name = "Maps Finder" component={MapFinder} />
        <Stack.Screen name = "Number Guessing Game" component={NumberGuessingGame} />
        <Stack.Screen name = "Page Navigation Example" component={PageNavigation} />
        <Stack.Screen name = "Recipe Finder" component={RecipeFinder} />
        <Stack.Screen name = "Shopping List" component={ShoppingList} />
        <Stack.Screen name = "Shopping List with Database" component={ShoppingDatabase} />
        <Stack.Screen name = "Shopping List with Firebase" component={ShoppingFirebase} />
      </Stack.Navigator>
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
