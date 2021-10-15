import React from 'react';
import {View, Text, Pressable, ImageBackground} from 'react-native';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import {strings} from '../../i18n';
import * as routes from '../../constants/routes';

import useAuth from '../../hooks/useAuth';
import Button from '../../components/button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const image = '../../assets/images/nebula.jpg';

type Props = {
  navigation: undefined,
}

const HomeScreen: React.FC<Props> = (props: NativeStackScreenProps<RootStackParamList>) => {
  const {logOut} = useAuth();
  const handleSignOut = async () => {
    try {
      await auth().signOut();
      logOut();
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoChats = () => {
    props.navigation.navigate(routes.USER_CHATS);
  };

  return (
    <View style={styles.mainContainerStyle}>
      <ImageBackground source={require(image)} style={styles.image}>
        <View style={styles.fullCenter}>
          <Text style={styles.whiteText}>
            {strings('simple_texts.home_page_greeting')}
            {/* {route.params.login} */}
          </Text>
          <Button onPress={handleGoChats} title="Chats" />
          <Button
            style={styles.button}
            onPress={handleSignOut}
            title={strings('buttons.logout')}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
