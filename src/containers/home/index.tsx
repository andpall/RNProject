import React from 'react';
import {View, Text, Button} from 'react-native';
import styles from './styles';
import {strings} from '../../i18n';
import { AuthContext } from '../../navigator/context';

const HomeScreen: React.FC<Props> = (props) => {

  const {signOut} = React.useContext(AuthContext);
  
  return (
    <View style={styles.mainContainerStyle}>
      <Text>
        {strings('simple_texts.home_page_greeting')}
        {/* {route.params.login} */}
      </Text>
      <Button
        title={strings('buttons.logout')}
        onPress={signOut}
      />
    </View>
  );
};

export default HomeScreen;
