import React, {useEffect, useState} from 'react';
import {Text, Pressable, View, Image, ActivityIndicator} from 'react-native';
import styles from './styles';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {useNavigation} from '@react-navigation/native';

import avatar from '../../assets/images/logo.jpg';
import * as routes from '../../constants/routes';
import * as db from '../../constants/db';

import {Conversation, RootStackParamList} from '../../types';
import useChat from '../../hooks/useChat';
import {selectDocument} from '../../services/firestore';

type Props = {
  conversationFieldId: number;
};

type ConversationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MyChats'
>;

const Converstation = (props: Props) => {
  const navigation = useNavigation<ConversationScreenNavigationProp>();
  const {conversationFieldId} = props;

  const user = firebase.auth().currentUser;
  const userUid = user?.uid;
  const [documentName, setDocumentName] = useState<string>('');
  // const [conversation, setConversation] = useState<Conversation>({});
  const [textOfLastMessage, setTextOfLastMessage] = useState('');

  const {getChat} = useChat();
  const conversation = getChat(conversationFieldId);

  useEffect(() => {
    setDocumentName(conversation.key);
    setTextOfLastMessage(
      conversation.messages[0]
        ? conversation.messages[conversation.messages.length - 1].text
        : ' ',
    );
  }, []);

  const pressHanlder = () => {
    navigation.navigate(routes.CHAT, {
      documentName,
      myId: userUid || '',
      mateId: '',
      messages: conversation.messages,
    });
  };

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
