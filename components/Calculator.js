import { StatusBar } from 'expo-status-bar';
import React  from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';

export default function Calculator() {
  const [num1, setNum1] = React.useState('');
  const [num2, setNum2] = React.useState('');
  const [sum, setSum] = React.useState('');
  const [diff, setDiff] = React.useState('');

  const addButton = () => {
    setSum((sum) =>parseInt(num1) + parseInt(num2));
  }

  const minusButton = () => {
    setDiff((diff) =>parseInt(num1) - parseInt(num2));
  }

  const clear = () => {
    setSum("?");
    setDiff("?");
  }

  return (
    <View style={styles.container}>
      <Text>Sum = {sum}, Difference = {diff}</Text>
      <TextInput
        keyboardType='numeric'
        style = {{width: 200, borderColor: 'gray', borderWidth: 1}}
        placeholder="First Number"
        onChangeText={num1=>setNum1(num1)}
      />
      <TextInput
        keyboardType='numeric'
        style = {{width: 200, borderColor: 'gray', borderWidth: 1}}
        placeholder="Second Number"
        onChangeText={num2=>setNum2(num2)}
      />
      <View style={styles.buttonStyle}>
      <Button title= " + "  onPress={addButton} />
      <Text> 
      &nbsp;&nbsp;&nbsp;&nbsp;
      </Text>
      <Button title= " - "  onPress={minusButton} />
      <Text> 
      &nbsp;&nbsp;&nbsp;&nbsp;
      </Text>
      <Button title= " clear "  onPress={clear} />
      </View>
     <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff200',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    padding: 20,
    flexDirection: 'row',
  },
});
