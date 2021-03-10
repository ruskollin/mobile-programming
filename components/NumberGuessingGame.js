import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput} from 'react-native';

export default function NumberGuessingGame() {
  const [value, setValue] = React.useState('');
  const [msg, setMsg] = React.useState('Guess a number between 1-100');
  const [counter, setCounter] = React.useState(0);
  const [random, setRandom] = React.useState(Math.round(Math.random() *100) + 1);
 
  const find = () => {  
      setRandom(random)
      const guess = value;
      if (guess > random) {
        setMsg("Too High")
        setCounter(counter +1)
      } else if (guess < random) {
        setMsg("Too Low")
        setCounter(counter +1)
      } 

      if (guess == random) {
        Alert.alert("You guessed the number in " + counter + " guesses")
      }
  }

  const startOver = () => {
    setRandom(Math.round(Math.random() *100) + 1)
    setMsg('Guess a number between 1-100')
    setCounter(0)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{msg}</Text>
      <TextInput
        keyboardType='numeric'
        style = {styles.textInputStyle}
        onChangeText={value=>setValue(value)}
      />  

    <View style={styles.buttonStyle}>
      <Button color="#D291BC" title= "MAKE GUESS"  onPress={find} />
      <Text> 
      &nbsp;&nbsp;&nbsp;&nbsp;
      </Text>
      <Button color="#D291BC" title= "START AGAIN"  onPress={startOver} />
    </View>

     <StatusBar style="auto" />
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
  buttonStyle: { 
    width: 200,
    marginTop: 20,
  },
  textStyle: {
    color: '#957DAD',
    fontWeight: 'bold',
  },
  textInputStyle : {
    marginTop: 10,
    width: 200, 
    height: 100, 
    fontSize: 40,
    borderColor: '#957DAD', 
    borderWidth: 2,
    color: '#957DAD',
    textAlign: 'center',
  },
});
