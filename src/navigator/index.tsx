import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginScreen from '../containers/auth';
import HomeScreen from '../containers/main';
import PhoneAuthScreen from '../containers/auth/phone_auth';

import * as routes from '../constants/routes';
import * as types from '../constants/actionTypes';
import {strings} from '../i18n';
import useAuth from '../hooks/useAuth';
import UserChats from '../containers/main/user_chats';
import ChatScreen from '../containers/main/chat';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

type RootStackParamList = {
  LoginScreen: {name: string};
  PhoneAuth: {name: string};
  Home: undefined;
  Profile: {userId: string};
  MyChats: undefined;
  Chat: undefined;
};

const Navigation = () => {
  const {isSignIn} = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isSignIn ? (
          <>
            <Stack.Screen
              name={routes.LOGIN_SCREEN}
              component={LoginScreen}
              options={{}}
            />
            <Stack.Screen
              name={routes.PHONE_LOGIN_SCREEN}
              component={PhoneAuthScreen}
              options={{}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={routes.HOME_SCREEN}
              component={HomeScreen}
              options={{
                title: strings('titles.home_page_title'),
                headerStyle: {backgroundColor: 'black'},
                headerTintColor: 'white',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={routes.USER_CHATS}
              component={UserChats}
              options={{
                title: strings('titles.home_page_title'),
                headerStyle: {backgroundColor: 'black'},
                headerTintColor: 'white',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={routes.CHAT}
              component={ChatScreen}
              options={{
                title: strings('titles.home_page_title'),
                headerStyle: {backgroundColor: 'black'},
                headerTintColor: 'white',
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
