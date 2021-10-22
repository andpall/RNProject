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
import * as db from '../../../constants/db';

import ChatMessage from '../../../components/message';
import BG from '../../../assets/images/nebula.jpg';
import {Message} from '../../../types';
import MessageItem from '../../../components/message';
import {sendMessage, subscribeOnNewMessages} from '../../../services/firestore';

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

  const handlePressSend = () => {
    sendMessage(
      {
        createdAt: Date.now(),
        text: message,
        user: myId,
      },
      docName,
    );
  };

  useEffect(() => {
    subscribeOnNewMessages(setMessages, docName)
  }, [docName]);

  return (
    <ImageBackground style={{width: '100%', height: '100%'}} source={BG}>
      <FlatList style = {{marginTop: 50}}
        data={messages}
        renderItem={({item}) => (
          <MessageItem myId={myId} message={item} mateId={mateId} />
        )}
      />
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={strings('placeholder.type_message')}
          style={styles.textInput}
          multiline
          value={message}
          onChangeText={setMessage}
        />
        <Button
          style={styles.buttonSend}
          title={strings('buttons.send')}
          onPress={handlePressSend}
        />
      </View>
    </ImageBackground>
  );
};

export default ChatScreen;
