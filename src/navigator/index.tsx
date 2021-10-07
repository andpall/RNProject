import React from 'react';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScrin from '../containers/auth';
import HomeScreen from '../containers/home';

import * as routes from '../constants/routes';
import {strings} from '../i18n';

const Stack = createNativeStackNavigator();

type Props = {
  name: string;
  // navigation: NavigationProp<ParamListBase>
  route: React.Component;
};

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.LOGIN_SCREEN}
        component={LoginScrin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes.HOME_SCREEN}
        component={HomeScreen}
        options={{title: strings('titles.home_page_title')}}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
