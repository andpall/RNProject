import React from 'react';
import {View, Text, Pressable, ImageBackground} from 'react-native';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import {strings} from '../../i18n';

import useAuth from '../../hooks/useAuth';

const image = '../../assets/images/nebula.jpg';

const HomeScreen: React.FC<Props> = props => {
  const {logOut} = useAuth();
  const handleSignOut = async () => {
    try {
      await auth().signOut();
      logOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.mainContainerStyle}>
      <ImageBackground source={require(image)} style={styles.image}>
        <View style={styles.fullCenter}>
          <Text style={styles.whiteText}>
            {strings('simple_texts.home_page_greeting')}
            {/* {route.params.login} */}
          </Text>
          <Pressable style={styles.button} onPress={handleSignOut}>
            <Text style={styles.whiteText}>{strings('buttons.logout')}</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
