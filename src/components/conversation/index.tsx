import React, {useEffect, useState} from 'react';
import {Text, Pressable, View, Image, ActivityIndicator} from 'react-native';
import styles from './styles';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import avatar from '../../assets/images/logo.jpg';
import * as routes from '../../constants/routes';
import * as db from '../../constants/db';

import {useNavigation} from '@react-navigation/native';
import {conversation} from '../../types';
import useChat from '../../hooks/useChat';
import {finishLoad, startLoad} from '../../actions';
import {selectDocument} from '../../services/firestore';

interface Props {
  // conv: conversation;
  convId: string;
}
const Converstation = (props: Props) => {
  const navigation = useNavigation();
  const {convId = ''} = props;

  const user = firebase.auth().currentUser;
  const userUid = user?.uid;
  const {isLoading, startLoading, endLoading} = useChat();
  const [docName, setDocName] = useState('');
  const [conversation, setConversation] = useState({});
  const [textOfLastMessage, setTextOfLastMessage] = useState('');

  useEffect(() => {
    selectDocument(convId).then(({chatData, chatId}) => {
      setDocName(chatId);
      setConversation(chatData);
      setTextOfLastMessage(
        chatData.messages[0]
          ? chatData.messages[chatData.messages.length - 1].text
          : ' ',
      );
    });
    endLoading();
  }, []);

  const pressHanlder = () => {
    navigation.navigate(routes.CHAT, {
      docName,
      myId: userUid,
      mateId: '',
      messages: conversation.messages,
    });
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Pressable style={styles.mainContainer} onPress={pressHanlder}>
      <View style={styles.lefContainer}>
        <Image source={avatar} style={styles.avatar} />
        <View style={styles.midContainer}>
          <Text style={styles.username}>{conversation.user}</Text>
          <Text numberOfLines={2} style={styles.lastMessage}>
            {textOfLastMessage}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Converstation;
