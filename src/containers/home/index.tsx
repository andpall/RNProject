import React from 'react';
import {View, Text, Button} from 'react-native';
import styles from './styles';
import * as routes from '../../constants/routes';
import {strings} from '../../i18n';
import { AuthContext } from '../../navigator/context';

const HomeScreen: React.FC<Props> = () => {

  const {signOut} = React.useContext(AuthContext);

  return (
    <View style={styles.mainContainerStyle}>
      <Text>
        {strings('simple_texts.home_page_greeting')}
        {/* {route.params.login} */}
      </Text>
      <Button
        title={strings('buttons.logout')}
        // onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
        onPress={() => signOut()}
      />
    </View>
  );
};

export default HomeScreen;
