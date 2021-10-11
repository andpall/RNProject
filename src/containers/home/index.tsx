import React from 'react';
import {View, Text, Button} from 'react-native';
import styles from './styles';
import {strings} from '../../i18n';

import store from '../../store/store';
import { signOut } from '../../actions';
import { useDispatch } from 'react-redux';

const HomeScreen: React.FC<Props> = (props) => {

  const dispatch = useDispatch();
  const pressHandler = ()=> {
    dispatch(signOut())
  }

  return (
    <View style={styles.mainContainerStyle}>
      <Text>
        {strings('simple_texts.home_page_greeting')}
        {/* {route.params.login} */}
      </Text>
      <Button
        title={strings('buttons.logout')}
        onPress={pressHandler}
      />
    </View>
  );
};

export default HomeScreen;
