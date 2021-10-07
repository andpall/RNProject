import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import styles from './styles';


const LoginScrin: React.FC<Props> = ({navigation}) => {
    return (
      <View style={styles.containerStyle}>
        <Text style={styles.blackTextStyle}> This is login page</Text>
        <TextInput style={styles.textInputStyle} />
        <Button
          title="Log in"
          color="black"
          onPress={() => navigation.navigate('MainScrin', {login: 'Default'})}
        />
      </View>
    );
  };

 export default LoginScrin; 