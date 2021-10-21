import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import styles from './styles';
import {strings} from '../../../i18n';
import Button from '../../../components/button';
import * as routes from '../../../constants/routes';
import * as db from '../../../constants/db';

import useAuth from '../../../hooks/useAuth';
import Converstation from '../../../components/conversation';
import {useNavigation} from '@react-navigation/core';
import useChat from '../../../hooks/useChat';
import {finishLoad} from '../../../actions';

const SearchAndAddConversation = () => {
  const navigation = useNavigation();
  const [searchinName, setSearchinName] = useState<string>('');

  const pressHandler = () => {
    firestore()
      .collection(db.COLLECTION)
      .add({
        id: Date.now(),
        user: `${searchinName}`,
        lastMessage: {
          createdAt: Date.now(),
          text: '',
          user: '',
        },
        messages: [{createdAt: '', text: '', user: ''}],
      });
  };

  const handlePressBack = () => {
    navigation.navigate(routes.HOME_SCREEN);
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <Button title="<" style={styles.buttonBack} onPress={handlePressBack} />
      <TextInput style={styles.textInputStyle} onChangeText={setSearchinName} />
      <Button
        style={styles.buttonNewConv}
        textStyle={styles.buttonTextPlus}
        title="+"
        onPress={pressHandler}
      />
    </View>
  );
};

const UserChats: React.FC = () => {
  const [chats, setChats] = useState([]);
  const {isLoading, startLoading, endLoading} = useChat();

  useEffect(() => {
    startLoading();
    const subscriber = firestore()
      .collection(db.COLLECTION)
      .onSnapshot(querySnapshot => {
        const chats = [];
        querySnapshot.forEach(documentSnapshot => {
          chats.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setChats(chats);
        endLoading();
      });
    return () => subscriber();
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{flex: 1}}>
      <SearchAndAddConversation />
      <View style={{alignContent: 'flex-start'}}>
        <FlatList
          data={chats}
          renderItem={({item}) => {
            return <Converstation key={item.id} convId={item.id} />;
          }}
          inverted
        />
      </View>
    </View>
  );
};

export default UserChats;
