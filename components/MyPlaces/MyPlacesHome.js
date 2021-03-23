import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, Alert } from 'react-native';
import{ Header, ListItem, Icon, Avatar } from 'react-native-elements';
import * as SQLite  from 'expo-sqlite';
import { TouchableOpacity } from 'react-native';

const db = SQLite.openDatabase('datadb.db');

export default function MyPlacesHome({navigation}) {
  const [address, setAddress] = useState('');
  const [placeslist, setPlaceslist] = React.useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists placeslist (id integer primary key not null, address text);');
      });
      updateList();
  }, []);

  const addList = () => {
    db.transaction(tx => {
      tx.executeSql('insert into placeslist (address) values (?);', 
        [address]);
    }, null, updateList
  )
    setAddress('');
  };

  const updateList = () =>{
    db.transaction(tx => {
      tx.executeSql('select * from placeslist;', [], (_, { rows})  => 
        setPlaceslist(rows._array)
      );
    });
  };

  const handlerLongClick = (id) => {
    Alert.alert (
      'Delete item.',
      'Are you really really sure?',
      [
        {
          text: 'Yes',
          onPress: () => 
          db.transaction(tx => {
            tx.executeSql('delete from placeslist where id = ?;', [id]);
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
  
    const showMap = (address) => {
      navigation.navigate('MyPlacesMap', {address: address.address})
    }

    const renderItem = ({ item }) => (
      <ListItem bottomDivider>
        <ListItem.Content style= {styles.content}>
          <TouchableOpacity
            onLongPress={handlerLongClick}>
          <ListItem.Title
            style={{ 
              color: 'black', 
              fontWeight: 'bold',
              marginLeft: 20,
              marginTop: 15
              }} >
            {item.address}
          </ListItem.Title>
          <Icon
            raised
            reverse
            containerStyle={{
              marginTop: -36,
              marginLeft: 326
            }} 
            name='map-marker'
            type='font-awesome'
            color= '#FFBCD9'
            onPress={() => showMap(item)}
          /> 
          </TouchableOpacity>
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
        height: 85,
        marginTop: -175
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
      <Text style = {styles.text}> My Places </Text>
      </Header>
      <TextInput
        style = {styles.textInputStyle}
        keyboardType = 'default'
        placeholder="enter a place"
        placeholderTextColor= 'black' 
        value={address}
        onChangeText={address => setAddress(address)}
      />
      <View style={styles.buttonStyle}>
      <Icon
        containerStyle={{
          alignItems: 'center',
        }} 
        raised
        reverse
        name='save'
        type='font-awesome'
        color= '#FFBCD9'
        onPress={addList}
        /> 
      </View>
      <FlatList
        style ={styles.listContainer}
        keyExtractor = {item => item.id.toString()}
        data={placeslist}
        renderItem = {renderItem}
      />
      <View style= {styles.footer}>
      <Text style= {styles.quote}>Long Press to Delete Item</Text>
      <Avatar 
        source={require('../images/circles.png')} 
        containerStyle={{ 
          marginTop: 10,
          flex: 1,
          width: 400
        }}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 170,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    backgroundColor: '#80CEE1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopEndRadius: 50,
    borderBottomEndRadius: 50,
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
  bodytext: {
    fontSize: 15,
    color: 'black'
  },
  textInputStyle: {
    marginTop: 23,
    width: 250, 
    height: 70, 
    fontSize: 20,
    borderColor: '#957DAD', 
    borderWidth: 2,
    textAlign: 'center'
  },
  quote: { 
    zIndex: 2,
    width: 200,
    marginLeft: 100,
    padding: 10,
    borderStyle: 'dotted',
    borderRadius: 1
  },
  listContainer: {
    width: '100%'
  },
  footer: {
    width: 400,
    height: 150,
    margin: 0
  },
});