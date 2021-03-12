import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Contacts from 'expo-contacts';

export default function App() {
  const[contact, setContact] = useState({});
  
  const getContacts = async() => {
    const {status} = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const {data} = await Contacts.getContactsAsync({
        fields:[Contacts.Fields.firstName, Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0 ) {
        setContact(data);
      }
    }
  }
  
  return (
    <View style = {styles.container}> 
        <View style = {styles.box}>
              <Button 
                style={styles.buttonStyle} 
                title = "Get Contact" 
                color="#D291BC"
                onPress = {getContacts} />
              <StatusBar style="auto" />
          <View style={styles.listcontainer}>
            <FlatList data = {contact} renderItem = {
              ({item}) => {
                if(item.phoneNumbers && item.phoneNumbers.length > 0) {
                  return ( <Text style = {styles.textStyle}> {item.firstName}, {item.phoneNumbers[0].number} </Text >)
                }     
              }
            }/>
          </View>
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
    flex: 1,
    backgroundColor: '#80CEE1',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  buttonStyle: {
    width: 120,
    padding: 20,
    marginTop: 10,
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
  listContainer : {
    padding: 10,
    marginTop: 30,
    width: '100%',
  },
});