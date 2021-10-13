import React from 'react';
import {Button, Pressable, Text} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';

import {strings} from '../../../i18n';
import styles from './styles';

GoogleSignin.configure({
  webClientId:
    '575368380690-6gja9k4asoch4d2mbg15eqd07lsfc48k.apps.googleusercontent.com',
});

const onGoogleButtonPress = async () => {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

const GoogleSignInButton = () => {
  return (
    <Pressable style={styles.button} onPress={onGoogleButtonPress}>
      <Text style={styles.buttonText}>{strings("buttons.google_login")}</Text>
    </Pressable>
  );
};
export default GoogleSignInButton;
