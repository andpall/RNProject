import React, {useEffect} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import styles from './styles';
import * as routes from '../../constants/routes';
import {strings} from '../../i18n';
import {AuthContext} from '../../navigator/context';
import {PROPERTY_TYPES} from '@babel/types';
// import store from '../../reducers/store';

const LoginScreen: React.FC<Props> = (props) => {

  const {signIn} = React.useContext(AuthContext);
  // const logIn = () => {
  //   signIn();
  //   props.navigation.navigate('HomeScreen');
  // };

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.blackTextStyle}>
        {strings('simple_texts.login_page_greeting')}
      </Text>
      <TextInput style={styles.textInputStyle} />
      <Button title={strings('buttons.login')} color="black" onPress={signIn} />
    </View>
  );
};

export default LoginScreen;
