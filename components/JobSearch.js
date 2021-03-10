import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function JobSearch() {
  const [desc, setDesc] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState([]);

  const getJobs = () => {
    const url = 'https://jobs.github.com/positions.json?description='+ desc + '&location=' + location;
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => { 
       setJobs(responseJson);
    })
    .catch((error) => { 
      Alert.alert('Error' , error); 
    }); 
  }
  
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList style={styles.list}
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.id} 
        renderItem={({item}) => <Text>{item.title}, {item.company}</Text>} 
        ItemSeparatorComponent={listSeparator}
        data={jobs} 
      />  
      <TextInput 
        style = {styles.textInputStyle}
        value={desc} 
        placeholder="Description"
        onChangeText={(desc) => setDesc(desc)} 
      />
      <TextInput 
        style= {styles.textInputStyle}
        value={location} 
        placeholder="Location"
        onChangeText={(location) => setLocation(location)} 
      />
      <View style={styles.buttonStyle}>
       <Button title="Find" onPress={getJobs} />
       </View>
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
 list: {
  height: 200,
  marginTop: 10,
},
 textInputSyle : {
  marginBottom: 20,
  width: 200, 
  height: 60, 
  fontSize: 40,
  borderColor: '#957DAD', 
  borderWidth: 2,
  color: '#957DAD',
  textAlign: 'center',
 },
 buttonStyle: {
  width: 120,
  padding: 20,
  marginTop: 10,
  flexDirection: 'row',
},
});