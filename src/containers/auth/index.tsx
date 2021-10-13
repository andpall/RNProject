import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import auth from '@react-native-firebase/auth';
import * as yup from 'yup';

import styles from './styles';
import {strings} from '../../i18n';

import store from '../../store/store';

import GoogleSignInButton from './google_auth';
import useAuth from '../../hooks/useAuth';

const LoginScreen: React.FC<Props> = props => {
  const {logIn, logInWithPhone} = useAuth();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [secure, setSecure] = useState(true);
  const schema = yup.object().shape({
    username: yup.string().min(5).max(20).required(),
    password: yup.string().min(8).required(),
  });
  const handleSignIn = async () => {
    try {
      await schema.validate({username, password});
      await auth().signInWithEmailAndPassword(username, password);
      logIn();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await schema.validate({username, password});
      await auth().createUserWithEmailAndPassword(username, password);
      logIn();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    setErrorMessage('');
  }, [username, password]);

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.blackTextStyle}>
        {strings('simple_texts.login_page_greeting')}
      </Text>
      <TextInput
        style={styles.textInputStyle}
        placeholder={strings('placeholder.username')}
        onChangeText={input => setUserName(input)}
        textAlign={'center'}
      />
      <TextInput
        style={styles.textInputStyle}
        secureTextEntry={secure}
        placeholder={strings('placeholder.password')}
        onChangeText={input => setPassword(input)}
        
      />
      <Text style={styles.errorText}>
        {errorMessage !== '' ? errorMessage : ' '}
      </Text>
      <Pressable style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>{strings('buttons.login')} </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>{strings('buttons.signup')} </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={logInWithPhone}>
        <Text style={styles.buttonText}>{strings('buttons.login_with_phone')} </Text>
      </Pressable>
      <GoogleSignInButton/>
    </View>
  );
};

export default LoginScreen;
