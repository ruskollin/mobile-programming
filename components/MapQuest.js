import React, {useState} from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {APIkey} from './MyKeys.js';

export default function MapQuest() {
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0121
  });
  const key = APIkey;

  const showAddress = () => {
    fetch('http://www.mapquestapi.com/geocoding/v1/address?key=' + key + '&location=' + address)
    .then(response => response.json())
    .then(responseData => {
      const lat = responseData.results[0].locations[0].latLng.lat;
      const lon = responseData.results[0].locations[0].latLng.lng;
      setRegion({latitude: lat, longitude: lon, latitudeDelta: 0.0222, longitudeDelta: 0.0121})
    });
  }

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
    
      <TextInput 
        style={{height: 40, fontSize: 18, marginBottom: 10}}
        placeholder='Type Address' 
        onChangeText={address => setAddress(address)}>
      </TextInput>
          
      <Button title="Show" onPress={showAddress} />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
