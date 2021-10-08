/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Navigation from './src/navigator';
import SecondNavigator from './src/actions/separating';

const App: () => Node = () => {
  return (
    <NavigationContainer>
        <Navigation />
        {/* <SecondNavigator /> */}
    </NavigationContainer>
  );
};

export default App;
