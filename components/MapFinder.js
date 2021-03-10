import React from 'react';
import{ View , Button, StyleSheet, TextInput} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {APIkey} from './MyKeys.js';

export default function MapFinder() {
  const [address, SetAddress] = React.useState('');
  const [region, SetRegion] = React.useState({latitude: 60.170275, longitude: 24.943749, latitudeDelta: 0.1, longitudeDelta: 0.1});
  const [markers, SetMarkers] = React.useState([]);
  const [lat, SetLat] = React.useState('');
  const [lng, SetLng] = React.useState('');
  const key= APIkey;

  GetAddress = () => {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + key;
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
      SetLat(jsondata.results[0].geometry.location.lat);
      SetLng(jsondata.results[0].geometry.location.lng);
      SetRegion({latitude: lat, longitude: lon, latitudeDelta: 0.0222, longitudeDelta: 0.0121})
    });
  }
  
  
return (
  <View style={styles.container}>
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
      onChangeText={address => SetAddress(address)}>
    </TextInput>

    <Button title="Show" onPress={GetAddress} />
  </View>
)
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });