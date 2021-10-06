import React from 'react';
import {View, StyleSheet} from 'react-native';
import LoginScrin from '../authification/LoginScrin';
import MainScrin from '../pages/MainScrin';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="LoginScrin" component={LoginScrin} />
        <Stack.Screen
          name="MainScrin"
          component={MainScrin}
          options={{ title: 'Welcome' }}
        />       
      </Stack.Navigator>
  );
};

export default Navigation