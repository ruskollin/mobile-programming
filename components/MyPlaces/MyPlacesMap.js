import * as Location from 'expo-location';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {APIkey} from './components/Keys.js';

export default function MyPlacesMap({route, navigation}) {
  const { address } = route.params;
  const [region, setRegion] = useState({
    latitude: 60.1999992,
    longitude: 24.926162962,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  });
  const key = APIkey;
  
  useEffect (() => {
    getLocation();
  }, []);

  const getLocation = (address) => {
    fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=${key}&location=${address}`)
      .then((result) => result.json())
      .then((data) =>
        setRegion({
          ...region,
          latitude: data.results[0].locations[0].latLng.lat,
          longitude: data.results[0].locations[0].latLng.lng,
        })
      )
      .catch((err) => console.error(err));
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
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
