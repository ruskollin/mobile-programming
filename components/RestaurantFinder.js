import * as Location from 'expo-location';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Button, TextInput, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {APIkey} from './MyKeys.js';

export default function App() {
  const [address, setAddress] = useState('');
  const [restaurants, setRestaurants] = useState([])
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0
  });

  const key = APIkey;
  
  useEffect (() => {
    getAddress();
  }, []);

  const getAddress = async() => {
    //Check permission
    let { status} = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('No permission to access location');
    } else {
      let location= await Location.getCurrentPositionAsync({});
      setAddress(location);
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;
      setRegion({latitude: lat, longitude: lon, latitudeDelta: 0.0222, longitudeDelta: 0.0121})
    
    }
  };

  const getRestaurants = () => {
	const restaurantUrl =
    'https://www.mapquestapi.com/search/v2/radius?origin=' + {address} +'&radius=80000&maxMatches=10&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581208&outFormat=json&key=' + key;
		
    fetch(restaurantUrl)
		.then((response) => response.json())
		.then((responseData) => {
			setRestaurants(responseData.results);
		})
		.catch((e) => {
			Alert.alert("Error", e.message);
		});
		return restaurants;
	};


  return (
    <View style = {styles.container}>
      <MapView 
        style={{ flex:1 }}
        region={region}>
      <Marker 
        coordinate={{
          latitude: region.latitude, 
          longitude: region.longitude}} 
          title={address}/>
      </MapView>
      <Button title="Show Restaurants" onPress={getRestaurants} />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
