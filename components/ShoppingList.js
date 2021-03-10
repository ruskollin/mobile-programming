import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, Animated} from 'react-native';

export default function ShoppingList() {
  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  const addList = () => {
    setData([...data, { key: text }]);
    setText('');
  }

  const clear = () => {
    setData([]);
    setText('');
  }


  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Shopping List</Text>
      <TextInput
        style = {styles.textInputStyle}
        keyboardType = 'default'
        placeholder="buy"
        value={text}
        onChangeText={text => setText(text)}
      />
      <View style={styles.buttonStyle}>
      <Button color="#D291BC" title= " ADD "  onPress={addList} />
      <Text> 
      &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
      </Text>
      <Button color="#D291BC" title= " CLEAR "  onPress={clear} />
      </View>

      <FlatList style={styles.list}
        data={data}
        renderItem={({ item }) =>
          <Text style={styles.textList}>{item.key}</Text>
        }
      />
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
    width: 140,
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    color: '#957DAD',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 40,
  },
  textInputStyle : {
    marginTop: 10,
    width: 250, 
    height: 70, 
    fontSize: 30,
    borderColor: '#957DAD', 
    borderWidth: 2,
    color: '#957DAD',
    textAlign: 'center',
  },
  list : {
    padding: 10,
    marginTop: 30,
  },
  textList: {
    color: '#957DAD',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

