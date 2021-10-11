import React from 'react';
import {View, Text, Button} from 'react-native';
import styles from './styles';
import {strings} from '../../i18n';

import store from '../../store/store';
import useAuth from '../../hooks/useAuth';

const HomeScreen: React.FC<Props> = (props) => {

  const {logOut} = useAuth(); 

  return (
    <View style={styles.mainContainerStyle}>
      <Text>
        {strings('simple_texts.home_page_greeting')}
        {/* {route.params.login} */}
      </Text>
      <Button
        title={strings('buttons.logout')}
        onPress={logOut}
      />
    </View>
  );
};

export default HomeScreen;
