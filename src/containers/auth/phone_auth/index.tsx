import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import * as yup from 'yup';

import styles from './styles';
import {strings} from '../../../i18n';

import store from '../../../store/store';
import useAuth from '../../../hooks/useAuth';
import * as routes from '../../../constants/routes'

function PhoneAuthScreen(props) {
  // If null, no SMS has been sent
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // Handle the button press
  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const {logIn, logOut} = useAuth();

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
      logIn();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleBack = () => {
    props.navigation.navigate(routes.LOGIN_SCREEN);
  }

  return (
    <View>
      {!confirm ? (
        <View style={styles.containerStyle}>
          <TextInput
            placeholder="Press phone"
            style={styles.textInputStyle}
            onChangeText={setPhoneNumber}
          />
          <Pressable
            style={styles.button}
            onPress={signInWithPhoneNumber}>
            <Text style={styles.buttonText}>{strings('buttons.login')}</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={handleBack}>
            <Text style={styles.buttonText}>{strings('buttons.logout')}</Text>
          </Pressable>
          <Text style={styles.errorText}>
            {errorMessage !== '' ? errorMessage : ' '}
          </Text>
        </View>
      ) : (
        <View style={styles.containerStyle}>
          <TextInput
            placeholder="Code"
            style={styles.textInputStyle}
            value={code}
            onChangeText={setCode}
          />
          <Pressable style={styles.button} onPress={() => confirmCode()}>
            <Text style={styles.buttonText}>{strings('buttons.login')}</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={handleBack}>
            <Text style={styles.buttonText}>{strings('buttons.logout')}</Text>
          </Pressable>
          <Text style={styles.errorText}>
            {errorMessage !== '' ? errorMessage : ' '}
          </Text>
        </View>
      )}
    </View>
  );
}

export default PhoneAuthScreen;
