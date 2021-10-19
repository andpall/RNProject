import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import * as yup from 'yup';

import styles from './styles';
import {strings} from '../../../i18n';
import Button from '../../../components/button';

import useAuth from '../../../hooks/useAuth';
import * as routes from '../../../constants/routes';

function PhoneAuthScreen(props) {
  // If null, no SMS has been sent
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const {logIn} = useAuth();

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
  };

  return (
    <View style={styles.containerStyle}>
      {!confirm ? (
        <>
          <TextInput
            placeholder={strings('placeholder.enter_phone')}
            style={styles.textInputStyle}
            onChangeText={setPhoneNumber}
          />
          <Button
            onPress={signInWithPhoneNumber}
            title={strings('buttons.login')}
          />
        </>
      ) : (
        <>
          <TextInput
            placeholder={strings('placeholder.code')}
            style={styles.textInputStyle}
            value={code}
            onChangeText={setCode}
          />
          <Button onPress={confirmCode} title={strings('buttons.login')} />
        </>
      )}
      <Button onPress={handleBack} title={strings('buttons.logout')} />
      <Text style={styles.errorText}>
        {errorMessage !== '' ? errorMessage : ' '}
      </Text>
    </View>
  );
}

export default PhoneAuthScreen;
