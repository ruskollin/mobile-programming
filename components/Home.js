import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View, Text, TextInput, Button, FlatList} from 'react-native';
import History from './History';

export default function Home({navigation}) {

    const [num1, setNum1] = React.useState('');
    const [num2, setNum2] = React.useState('');
    const [answer, setAnswer] = React.useState('');
    const [data, setData] = React.useState([]);
  
    const addButton = () => {
      const sum = parseFloat(num1) + parseFloat(num2);
      setAnswer(sum);
      setData([...data, {key: `${num1} + ${num2} = ${sum}`}]);
    }
  
    const minusButton = () => {
      const diff = parseFloat(num1) - parseFloat(num2);
      setAnswer(diff);
      setData([...data, {key: `${num1} - ${num2} = ${diff}`}]);
    }


    return (
        <View style={styles.container}>
        <View style={styles.box}>
        <Text style={styles.textStyle}>Result = {answer}</Text>
        </View>
        <TextInput
          keyboardType='numeric'
          style = {styles.textInputStyle}
          placeholder="Number"
          onChangeText={num1=>setNum1(num1)}
        />
        <TextInput
          keyboardType='numeric'
          style = {styles.textInputStyle}
          placeholder="Number"
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
        <Button title = "History" onPress = {() => navigation.navigate('History', {data}) } />
        </View>
 
       <StatusBar style="auto" />
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        padding: 50,
        flex: 1,
        backgroundColor: '#80CEE1',
        alignItems: 'center',
        justifyContent: 'center',
      },
      box: {
        flexDirection: 'row',
        padding: 20,
        borderWidth: 3,
        height: 50,
        width: 150,
        borderColor: '#957DAD',
        alignItems: 'center',
        justifyContent: 'center',
      },
      list: {
        height: 200,
      },
      buttonStyle: {
        width: 120,
        padding: 20,
        marginTop: 10,
        flexDirection: 'row',
      },
      textStyle: {
        color: '#957DAD',
        fontWeight: 'bold',
      },
      textInputStyle : {
        marginTop: 10,
        width: 200, 
        height: 60, 
        fontSize: 40,
        borderColor: '#957DAD', 
        borderWidth: 2,
        color: '#957DAD',
        textAlign: 'center',
      },
    });
  