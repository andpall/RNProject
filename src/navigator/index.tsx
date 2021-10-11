import React, {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../containers/auth';
import HomeScreen from '../containers/home';

import * as routes from '../constants/routes';
import * as types from '../constants/actionTypes';
import {strings} from '../i18n';

const Stack = createNativeStackNavigator();

type Props = {
  name: string;
  // navigation: NavigationProp<ParamListBase>
  route: React.Component;
};

const Navigation = () => {
  const isSignIn = useSelector(state => state.auth.isSignIn);
  const dispatch = useDispatch();

  return (
      <NavigationContainer>
        <Stack.Navigator>
          {!isSignIn ? (
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
  );
};

export default Navigation;
