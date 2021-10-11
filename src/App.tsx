/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {Provider} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Navigation from './navigator';
import store from './store/store';

const App: () => Node = () => {
  return (
    <Provider store={store}>
        <Navigation />
    </Provider>
  );
};

export default App;
