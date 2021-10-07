import React from 'react';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from './styles';
import LoginScrin from '../containers/auth';
import HomeScreen from '../containers/home';

const Stack = createNativeStackNavigator();

type Props = {
  name: string;
  // navigation: NavigationProp<ParamListBase>
  route: React.Component;
};

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScrin" component={LoginScrin} />
      <Stack.Screen
        name="MainScrin"
        component={HomeScreen}
        options={{title: 'Welcome'}}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
