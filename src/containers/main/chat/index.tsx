import React, {useState, useEffect} from 'react';
import {View, ImageBackground, FlatList, TextInput} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import styles from './styles';
import {strings} from '../../../i18n';
import Button from '../../../components/button';

import useAuth from '../../../hooks/useAuth';
import * as routes from '../../../constants/routes';

import ChatMessage from '../../../components/message';
import BG from '../../../assets/images/nebula.jpg';
import {Message} from '../../../types';
import MessageItem from '../../../components/message';

interface Props {
  myId: string;
  mateId: string;
  convId: string;
  _messages: Message[];
  docName: string;
}

const ChatScreen = ({route}) => {
  const {myId, mateId, convId, docName} = route.params;
  const user = auth().currentUser;

  const navigation = useNavigation();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState('');
  const [conversation, setConversation] = useState('');

  const handlePressBack = () => {
    navigation.navigate(routes.USER_CHATS);
  };

  const handlePressSend = () => {
    firestore()
      .collection('conversations')
      .doc(docName)
      .update({
        messages: [
          ...messages,
          {
            createdAt: Date.now(),
            text: message,
            user: myId,
          },
        ],
      })
      .then(() => {
        console.debug('Message sent');
      });
  };

  const getMessages = documentSnapshot => {
    return documentSnapshot.get('messages');
  };

  const onResult = (QuerySnapshot) => {
    setMessages(getMessages(QuerySnapshot));
  }

  const onError = (error) => {
    console.error(error);
  }

  useEffect(() => {
    const subscriber = firestore()
      .collection('conversations')
      .doc(docName)
      .onSnapshot(onResult, onError);
    return () => subscriber();
  }, [docName]);

  return (
    <ImageBackground style={{width: '100%', height: '100%'}} source={BG}>
      <View style={{flexDirection: 'row'}}>
        <Button title="<" style={styles.buttonBack} onPress={handlePressBack} />
      </View>
      <FlatList
        data={messages}
        renderItem={({item}) => (
          <MessageItem myId={myId} message={item} mateId={mateId} />
        )}
      />
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={'Type a message'}
          style={styles.textInput}
          multiline
          value={message}
          onChangeText={setMessage}
        />
        <Button
          style={styles.buttonSend}
          title="send"
          onPress={handlePressSend}
        />
      </View>
    </ImageBackground>
  );
};

export default ChatScreen;
