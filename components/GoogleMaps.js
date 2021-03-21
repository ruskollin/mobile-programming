import React from 'react';
import{ View , Button, StyleSheet, TextInput} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {APIkey} from './MyKeys.js';

export default function GoogleMaps() {
  const [address, setAddress] = React.useState('');
  const [region, setRegion] = React.useState({latitude: 60.170275, longitude: 24.943749, latitudeDelta: 0.1, longitudeDelta: 0.1});
  const [markers, setMarkers] = React.useState([]);
  const [lat, setLat] = React.useState('');
  const [lng, setLng] = React.useState('');
  const key= APIkey;

  getAddress = () => {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + key;
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
      setLat(jsondata.results[0].geometry.location.lat);
      setLng(jsondata.results[0].geometry.location.lng);
      setRegion({latitude: lat, longitude: lon, latitudeDelta: 0.0222, longitudeDelta: 0.0121})
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
      onChangeText={address => setAddress(address)}>
    </TextInput>

    <Button title="Show" onPress={getAddress} />
  </View>
)
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });