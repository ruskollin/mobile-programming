import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Text, FlatList, TextInput, Alert } from 'react-native';
import{ Header, ListItem, Avatar, Icon } from 'react-native-elements';
import * as SQLite  from 'expo-sqlite';
const db = SQLite.openDatabase('datadb.db');

export default function UI() {
  const [product, setProduct] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [data, setData] = React.useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists data (id integer primary key not null, product text, amount text);');
      });
      updateList();
  }, []);

  const addList = () => {
    db.transaction(tx => {
      tx.executeSql('insert into data (product, amount) values (?,?);', 
        [product,  amount]);
    }, null, updateList
  )
    setProduct('');
    setAmount('');
  };

  const updateList = () =>{
    db.transaction(tx => {
      tx.executeSql('select * from data;', [], (_, { rows})  => 
        setData(rows._array)
      );
    });
  };

  const clear = (id) => {
    Alert.alert (
      'What?',
      'Are you really really sure?',
      [
        {
          text: 'Yes',
          onPress: () => 
          db.transaction(tx => {
            tx.executeSql('delete from data where id = ?;', [id]);
          }, null, updateList) 
        },
        {
          text: 'No',
          onPress: () => console.log('No Pressed')
        },
      ],
      {cancelable:false},
    );
    };

  const renderItem = ({item, id}) => (
    <ListItem bottomDivider
    containerStyle={{
      backgroundColor: '#80CEE1'
      }} >
      <ListItem.Content
        style= {styles.content}>
        <ListItem.Title
          style={{ 
            color: 'black', 
            fontWeight: 'bold',
            marginLeft: 20,
            marginTop: 15
            }} >
          {item.product}
        </ListItem.Title>
        <ListItem.Subtitle
          style={{ 
            color: 'black',
            marginTop: 15,
            marginLeft: 200
            }} >
            {item.amount}        
        </ListItem.Subtitle>
        <Icon
          containerStyle={{
            marginTop: -10
          }} 
          name='times'
          type='font-awesome'
          color= '#FFBCD9'
          onPress={() => clear(item.id)}
        /> 
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style = {styles.container}>
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content" 
        centerComponent={{ 
        style: { 
        color: '#fff',
        fontSize: 30,
        flexDirection: 'row'
        } 
        }}
        containerStyle={{
        backgroundColor: '#80CEE1',
        width: 430,
        height: 80,
        justifyContent: 'space-around',
        }}  
      >
      <Icon
        name='bars'
        type='font-awesome'
        color='#fff'
        onPress={addList}
        containerStyle={{
          marginLeft: 20,
          marginTop: 15,
        }} 
      />   
      <Text style = {styles.text}> Grocery </Text>
      <Avatar 
        source={require('./images/bag.png')} 
        containerStyle={{ marginTop: 10}}
      />
      </Header>
      <TextInput
        style = {styles.textInputStyle}
        keyboardType = 'default'
        placeholder="product"
        placeholderTextColor= 'white' 
        value={product}
        onChangeText={product => setProduct(product)}
      />
      <TextInput
        style = {styles.textInputStyle}
        keyboardType = 'default'
        placeholder="amount"
        placeholderTextColor= 'white' 
        value={amount}
        onChangeText={amount => setAmount(amount)}
      />
      <View style={styles.buttonStyle}>
      <Icon
        containerStyle={{
          alignItems: 'center'
        }} 
        raised
        reverse
        name='shopping-cart'
        type='font-awesome'
        color= '#FFBCD9'
        onPress={addList}
        /> 
      </View>

      <FlatList
        style ={styles.listContainer}
        keyExtractor = {item => item.id.toString()}
        data={data}
        renderItem = {renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#80CEE1',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    backgroundColor: '#80CEE1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopStartRadius: 45,
    borderBottomStartRadius: 80,
    marginLeft: -4,
    height: 60,
    fontSize: 50,
    shadowColor: "#000",
  shadowOffset: {
	  width: 0,
	  height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  },
  buttonStyle: { 
    width: 140,
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 30,
    color: 'black'
  },
  textInputStyle : {
    marginTop: 20,
    width: 250, 
    height: 70, 
    fontSize: 20,
    borderColor: '#957DAD', 
    borderWidth: 2,
    color: '#957DAD',
    textAlign: 'center',
  },
  listContainer : {
    width: '100%',
    backgroundColor: '#80CEE1'
  },
  deleteButton: {
    textAlign: 'right',
    fontSize: 18, 
    color: '#0000ff'
  }
});