import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import Calculator from './components/Calculator';
import CalculatorHistory from './components/CalculatorHistory';
import Camera from './components/Camera';
import Contacts from './components/Contacts';
import CurrencyConverter from './components/CurrencyConverter';
import JobSearch from './components/JobSearch';
import Location from './components/Location';
import MapFinder from './components/GoogleMaps';
import Maps from './components/MapQuest';
import NumberGuessingGame from './components/NumberGuessingGame';
import PageNavigation from './components/PageNavigation';
import Reader from './components/Reader';
import RestaurantFinder from './components/RestaurantFinder';
import RecipeFinder from './components/RecipeFinder';
import ShoppingDatabase from './components/ShoppingDatabase';
import ShoppingFirebase from './components/ShoppingFirebase';
import ShoppingList from './components/ShoppingList';
import TextToSpeech from './components/TextToSpeech';
import UI from './components/UI';
import MyPlaces from './components/MyPlaces';


export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name = "Home" component={Home} />
        <Stack.Screen name = "Calculator" component={Calculator} />
        <Stack.Screen name = "Calculator with History" component={CalculatorHistory} />
        <Stack.Screen name = "Camera" component={Camera} />
        <Stack.Screen name = "Contacts" component={Contacts} />
        <Stack.Screen name = "Currency Converter" component={CurrencyConverter} />
        <Stack.Screen name = "Job Search" component={JobSearch} />
        <Stack.Screen name = "Search Location" component={Location} />
        <Stack.Screen name = "MapQuest" component={Maps} />
        <Stack.Screen name = "Google Maps" component={MapFinder} />
        <Stack.Screen name = "Restaurant Finder" component={RestaurantFinder} />
        <Stack.Screen name = "My Places" component={MyPlaces} />
        <Stack.Screen name = "Number Guessing Game" component={NumberGuessingGame} />
        <Stack.Screen name = "Page Navigation Example" component={PageNavigation} />
        <Stack.Screen name = "Reader" component={Reader} />
        <Stack.Screen name = "Recipe Finder" component={RecipeFinder} />
        <Stack.Screen name = "Shopping List" component={ShoppingList} />
        <Stack.Screen name = "Shopping List with Database" component={ShoppingDatabase} />
        <Stack.Screen name = "Shopping List with Firebase" component={ShoppingFirebase} />
        <Stack.Screen name = "Text to Speech" component={TextToSpeech} />
        <Stack.Screen name = "Shopping List with UI" component={UI} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});