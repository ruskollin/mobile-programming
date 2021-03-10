import React from 'react';
import {StyleSheet, View, Text, FlatList, Button} from 'react-native';

export default function History({route}) {
    const {data} = route.params;

    const clear = () => {
        setAnswer("");
        setData([]);
        }
        
    return (
        <View style={styles.container}>
            {data.map(item => <Text style={{fontSize: 20}} key={item}>{item}</Text>)}   
            <Button title= " clear history "  onPress={clear} />
        </View>

        
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 100,
        marginTop:50,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
      },
  });