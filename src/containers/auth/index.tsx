import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import styles from './styles';
import {strings} from '../../i18n';

import store from '../../store/store';
import useAuth from '../../hooks/useAuth';

const LoginScreen: React.FC<Props> = props => {

  const {logIn} = useAuth();

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.blackTextStyle}>
        {strings('simple_texts.login_page_greeting')}
      </Text>
      <TextInput style={styles.textInputStyle} />
      <Button
        title={strings('buttons.login')}
        color="black"
        onPress={logIn}
      />
    </View>
  );
};

export default LoginScreen;
