import React from 'react';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScrin from '../containers/auth';
import HomeScreen from '../containers/home';

import * as routes from '../constants/routes';
import {strings} from '../i18n';

import {AuthContext} from './context';
const Stack = createNativeStackNavigator();

type Props = {
  name: string;
  // navigation: NavigationProp<ParamListBase>
  route: React.Component;
};

const Navigation = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignin: true,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignin: false,
          };
      }
    },
    {
      isSignin: false,
    },
  );

  const authContext = React.useMemo(
    () => ({
      signIn: () => {
        dispatch({type: 'SIGN_IN'});
      },
      signOut: () => {
        dispatch({type: 'SIGN_OUT'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator>
      {state.isSignin === false ? (
        <Stack.Screen
          name={routes.LOGIN_SCREEN}
          component={LoginScrin}
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
    </AuthContext.Provider>
  );
};

export default Navigation;
