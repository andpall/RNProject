import React from 'react';
import {Button, View, TextInput, StyleSheet, Text} from 'react-native';

const LoginScrin = ({navigation}) => {
  return (
    <View style = {styles.componentStyle}>
      <Text style={styles.textStyle}> This is login page</Text>
      <TextInput  style={styles.textInputStyle}/>
      <Button
        title="Log in"
        color = 'black'
        onPress={() => navigation.navigate('MainScrin', {login: 'Default'})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle:{
    color: "black"
  },
  textInputStyle:{
    borderRadius: 3,
    borderColor: 'black',
    borderWidth: 5,
    height: 20,
    width: "80%"
  },
  componentStyle: {
      flexDirection: 'column',
      height: 400,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
  },
});

export default LoginScrin;
