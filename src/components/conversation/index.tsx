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
import { finishLoad, startLoad } from '../../actions';

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
    startLoad()
  })

  useEffect(() => {
    firestore()
      .collection(db.COLLECTION)
      .where('id', '==', convId)
      .get()
      .then(({docs}) => {
        const dataId = docs[0].id;
        const dataItem = docs[0].data();
        setDocName(dataId);
        setConversation(dataItem);
        // setTextOfLastMessage(dataItem.lastMessage.text);
        setTextOfLastMessage(
          dataItem.messages[dataItem.messages.length - 1].text,
        );
        finishLoad();
      });
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
        <Image
          source={avatar}
          style={styles.avatar}
        />
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
