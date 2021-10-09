import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import styles from './styles';
import {strings} from '../../i18n';
import {AuthContext} from '../../navigator/context';

const LoginScreen: React.FC<Props> = (props) => {

  const {signIn} = React.useContext(AuthContext);

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
