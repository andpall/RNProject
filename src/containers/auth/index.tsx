import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import styles from './styles';
import {strings} from '../../i18n';

import store from '../../store/store';
import {signIn} from '../../actions';
import {useDispatch} from 'react-redux';
import useAuth from '../../hooks/useAuth';

const LoginScreen: React.FC<Props> = props => {

  const dispatch = useDispatch();
  const pressHandler = () => {
    dispatch(signIn());
  };
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.blackTextStyle}>
        {strings('simple_texts.login_page_greeting')}
      </Text>
      <TextInput style={styles.textInputStyle} />
      <Button
        title={strings('buttons.login')}
        color="black"
        onPress={pressHandler}
      />
    </View>
  );
};

export default LoginScreen;
