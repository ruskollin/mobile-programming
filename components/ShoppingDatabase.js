import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, Alert } from 'react-native';
import * as SQLite  from 'expo-sqlite';
import { Header } from 'react-native-elements';
const db = SQLite.openDatabase('datadb.db');

export default function ShoppingDatabase() {
  const [product, setProduct] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [shopList, setShopList] = React.useState([]);

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
        setShopList(rows._array)
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
          db .transaction(tx  => {
            tx .executeSql('delete from data where id = ?;', [id]);
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

  return (
    <View style = {styles.container}>
      <Header
     statusBarProps={{ barStyle: 'light-content' }}
     barStyle="light-content" 
     centerComponent={{ 
       text: 'My Grocery List', 
       style: { 
        color: '#fff',
        fontSize: 30
      } }}
     containerStyle={{
       backgroundColor: '#D291BC',
       width: 430,
       height: 80,
       justifyContent: 'space-around',
     }}  />
   <TextInput
        style = {styles.textInputStyle}
        keyboardType = 'default'
        placeholder="product"
        value={product}
        onChangeText={product => setProduct(product)}
      />
      <TextInput
        style = {styles.textInputStyle}
        keyboardType = 'default'
        placeholder="amount"
        value={amount}
        onChangeText={amount => setAmount(amount)}
      />
      <View style={styles.buttonStyle}>
      <Button color="#D291BC" title= " SAVE "  onPress={addList} />
      </View>

      {/* <View style = {styles.list}>
        <Text style = {styles.title}>ITEMS</Text>
      </View> */}

      <FlatList
        style ={styles.listContainer}
        keyExtractor = {item => item.id.toString()}
        data={shopList}
        renderItem={({item}) => 
          <View>
            <Text style={styles.itemList}>{item.product}</Text>
            <Text style={styles.itemAmount}>{item.amount}</Text>
            <Text style={styles.deleteButton} onPress={() => clear(item.id)}> Clear </Text>
          </View>} 
      />
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
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  textStyle: {
    color: '#957DAD',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 40,
  },
  textInputStyle : {
    marginTop: 20,
    width: 250, 
    height: 70, 
    fontSize: 30,
    borderColor: '#957DAD', 
    borderWidth: 2,
    color: '#957DAD',
    textAlign: 'center',
  },
  listContainer : {
    padding: 10,
    marginTop: 30,
    width: '100%',
  },
  list: {
    textAlign: 'center',
    marginTop: 20,
    width: '100%',
    borderTopWidth: 2,
    borderColor: '#957DAD'

  },
  itemList: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#D291BC'
  },
  itemAmount: {
    fontSize: 15,
    color: '#000000'
  },
  deleteButton: {
    textAlign: 'right',
    fontSize: 18, 
    color: '#0000ff'
  }
});