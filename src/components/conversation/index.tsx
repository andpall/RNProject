import React from 'react';
import {Text, Pressable, View, Image} from 'react-native';
import styles from './styles';

import * as routes from '../../constants/routes';
import {useNavigation} from '@react-navigation/native';

interface Props {
  id?: string;
  mateName?: string;
  lastMessage?: string;
}
const Converstation = (props: Props) => {
  const navigation = useNavigation();
  const {
    id = Date.now().toString(),
    mateName = '',
    lastMessage = 'Some example long message with demonstration of comething',
  } = props;

  const pressHanlder = () => {
    navigation.navigate(routes.CHAT, {id: '', condId: '', mateId: ''});
  };

  return (
    <Pressable style={styles.mainContainer} onPress={pressHanlder}>
      <View style={styles.lefContainer}>
        <Image
          source={require('../../assets/images/logo.jpg')}
          style={styles.avatar}
        />
        <View style={styles.midContainer}>
          <Text style={styles.username}>{mateName}</Text>
          <Text numberOfLines={2} style={styles.lastMessage}>
            {lastMessage}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Converstation;
