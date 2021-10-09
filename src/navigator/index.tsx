import React, {useMemo, useState} from 'react';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../containers/auth';
import HomeScreen from '../containers/home';

import * as routes from '../constants/routes';
import {strings} from '../i18n';
import * as types from '../constants/actionTypes';

import {AuthContext} from './context';
import store from '../reducers/store';
import authReducer from '../reducers/authReducer';
import { useDispatch } from 'react-redux';

const Stack = createNativeStackNavigator();

type Props = {
  name: string;
  // navigation: NavigationProp<ParamListBase>
  route: React.Component;
};

const Navigation = () => {
  // const [state, dispatch] = React.useReducer(authReducer, {isSignIn: false});
  const dispatch = useDispatch()

  const authContext = {
    signIn: () => {
      dispatch({type: types.LOGIN});
    },
    signOut: () => {
      dispatch({type: types.LOGOUT});
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {!store.getState().auth.isSignIn ? (
            <Stack.Screen
              name={routes.LOGIN_SCREEN}
              component={LoginScreen}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen
              name={routes.HOME_SCREEN}
              component={HomeScreen}
              options={{title: strings('titles.home_page_title')}}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Navigation;
