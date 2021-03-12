import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const[photoName, setPhotoName] = useState('' );
  const[photoBase64, setPhotoBase64] = useState('' );
  const camera = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const snap = async () => {
    if (camera) {
    const photo = await camera.current.takePictureAsync({base64: true});
    setPhotoName(photo.uri);
    setPhotoBase64(photo.base64);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
          
        </View>
      </Camera>
      <View><Button title="Take Photo" onPress={snap} /></View>
      <View style={{flex:4}}>
        <Image style={{flex:1}}
        source={{uri : photoName}} />
        <Image style={{flex:1}}
        source={{uri : `data:image/gif;base64,${photoBase64}`}} /></ View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#80CEE1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    marginTop: 40,
  },
  camera: {
    width: 350,
    height: 500,
  },
});