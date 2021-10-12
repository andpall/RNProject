import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import * as yup from 'yup';

import styles from './styles';
import {strings} from '../../i18n';

import store from '../../store/store';
import useAuth from '../../hooks/useAuth';

const LoginScreen: React.FC<Props> = props => {
  const {logIn} = useAuth();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [secure, setSecure] = useState(true);
  const schema = yup.object().shape({
    username: yup.string().min(5).max(20).required(),
    password: yup.string().min(8).required(),
  });
  const handleLogin = async () => {
    try {
      await schema.validate({username, password});
      await auth().signInWithEmailAndPassword(username, password);
      setUserName('');
      setPassword('');
      {
        logIn();
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await schema.validate({username, password});
      await auth().createUserWithEmailAndPassword(username, password);
      console.log('User account created & signed in!');
      setUserName('');
      setPassword('');
      {
        logIn();
      }
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
        textAlign={'center'}
      />
      <Text style={styles.errorText}>
        {errorMessage !== '' ? errorMessage : ' '}
      </Text>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{strings('buttons.login')} </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>{strings('buttons.signup')} </Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
