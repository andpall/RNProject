import React from 'react';
import {View, StyleSheet, Text, TextInput, Button} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from './styles';


const Stack = createNativeStackNavigator();

type Props = {
  name: string;
  // navigation: NavigationProp<ParamListBase>
  route: React.Component
};


const LoginScrin: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.loginComponentStyle}>
      <Text style={styles.blackTextStyle}> This is login page</Text>
      <TextInput style={styles.loginTextInputStyle} />
      <Button
        title="Log in"
        color="black"
        onPress={() => navigation.navigate('MainScrin', {login: 'Default'})}
      />
    </View>
  );
};

const MainScrin: React.FC<Props> = ({navigation, route}) => {
  return (
    <View style={styles.mainComponentStyle}>
      <Text>This is main page of {route.params.login} user</Text>
      <Button
        title="Log Out"
        onPress={() => navigation.navigate('LoginScrin')}
      />
    </View>
  );
};

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScrin" component={LoginScrin} />
      <Stack.Screen
        name="MainScrin"
        component={MainScrin}
        options={{title: 'Welcome'}}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
