import React from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import {strings} from '../../i18n';

import store from '../../store/store';
import useAuth from '../../hooks/useAuth';

const HomeScreen: React.FC<Props> = props => {
  const {logOut} = useAuth();
  const handleSignOut = async () => {
    try {
      await auth().signOut();
      logOut();
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <View style={styles.mainContainerStyle}>
      <Text>
        {strings('simple_texts.home_page_greeting')}
        {/* {route.params.login} */}
      </Text>
      <Button title={strings('buttons.logout')} onPress={handleSignOut} />
    </View>
  );
};

export default HomeScreen;
