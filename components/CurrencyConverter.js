import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function CurrencyConverter() {
  const [rates, setRates] = useState([]);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('');
  const [result, setResult] = useState(0);

  useEffect(() => {
    fetch('https://api.exchangeratesapi.io/latest')
    .then(response => response.json())
    .then(responseJson => setRates(responseJson.rates))
    .catch(error => {
      Alert.alert(error);
    });
  }, []);

  //calculate conversion
  const rateConversion = () => {
    const rate = rates[currency];
    setResult((amount / rate).toFixed(5))
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <Text> {result} €</Text>
      
      <View style={styles.box}>
        <TextInput 
          style={styles.text}
          placeholder ="amount"
          type="numeric"
          onChangeText={amount => setAmount(amount)} />
      </View>

      <View style={styles.button}>
        <Picker
          selectedValue={currency}
          onValueChange={value => setCurrency(value)}>
          {
            Object.keys(rates).map((item,index) =>
              <Picker.Item key={index} label={item} value={item} />)
          }
        </Picker>
      </View>
      
      <View style={styles.button}>
        <Button title="Convert" onPress={rateConversion} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9AC8EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    flexDirection: 'row',
    borderWidth: 3,
    marginTop: 25,
    height: 50,
    width: 250,
    borderColor: '#957DAD',
    alignSelf: 'center',
    textAlign: 'left',
  },
  text: {
    color: '#957DAD',
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'right',
    marginLeft: 10,
  }
});
