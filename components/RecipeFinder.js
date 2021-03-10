import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, FlatList, Image, StatusBar} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function RecipeFinder() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState([]);

 getRecipe = () => {
  fetch('http://www.recipepuppy.com/api/?i=' + ingredients)
    .then(response => response.json())
    .then(responseJson => setRecipe(responseJson.results))
    .catch((error) => { 
        Alert.alert('Error', error); 
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
      <StatusBar hidden={true} />
      <View style={styles.box}>
        <TextInput
          style={styles.text}
          value={ingredients} 
          placeholder="Ingredients"
          onChangeText={(ingredients) => setIngredients(ingredients)} />
        
        <View style={styles.button}>
          <FontAwesome.Button 
            name='search'
            color='black'
            textAlign='right'
            backgroundColor='#9AC8EB'
            onPress={getRecipe}>
          </FontAwesome.Button>
        </View>
      </View>

        <FlatList 
          style={styles.results}
          data={recipe} 
          //keyExtractor={item => item.id} 
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => 
            <View>
              <Text style={{fontSize: 18}}> {item.title} </Text>
              <Image
                style={{width: 66, height: 58}}
                source={{uri: item.thumbnail}}
              />
            </View>}

            data={recipe}
            ItemSeparatorComponent={listSeparator} />
         
      </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9AC8EB',
    padding: 10,
  },
  text: {
    color: '#957DAD',
    fontWeight: 'bold',
    alignSelf: 'center',
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
  list:{
    margin:5,
    padding:5,
    backgroundColor:'#B6D8F2',
    alignSelf:'center',
    flexDirection:'row',
    borderRadius:5
  },
  button: {
    width: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'right',
    marginLeft: 110,
  }
});