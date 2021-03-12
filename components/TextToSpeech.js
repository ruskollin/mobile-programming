import * as React from 'react';
import { TextInput, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';

export default function App() {
  const [text, setText] = React.useState('');

  const speak = () => {
    // var thingToSay = 'Ruskin Kollin';
    // Speech.speak(thingToSay);
    Speech.speak(text);
  }

  const clear = () => {
    setText("");
  }

  return (
    <View style = {styles.container}>
      <TextInput  
        style = {styles.textInputStyle}
        keyboardType = 'default'
        value={text}
        onChangeText= {text => setText(text)} />
      <View style={styles.buttons}>
        <Button color="#D291BC" onPress = {speak} title = "Press to hear text" />
      </View>
      <View style={styles.buttons}> 
        <Button title= " clear "  onPress={clear} />
      </View>
    </View>
  );

  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#80CEE1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    flex: 1,
    backgroundColor: '#80CEE1',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  buttons: { 
    marginTop: 20,
    width: 200,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});