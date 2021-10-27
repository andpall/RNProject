import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  FlatList,
  TextInput,
  PermissionsAndroid,
} from 'react-native';

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
import {Recorder} from '../../../services/audioRecord';
import {
  checkMicrophone,
  requestMicrophone,
} from '../../../services/permissions';

interface Props {
  myId: string;
  mateId: string;
  convId: string;
  _messages: Message[];
  documentName: string;
}

const ChatScreen = ({route}) => {
  const {myId, mateId, convId, documentName} = route.params;
  const user = auth().currentUser;

  const navigation = useNavigation();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [isRecording, setIsRecording] = useState(false);
  const [recordToken, setRecordToken] = useState(null);

  const handlePressSend = () => {
    recordToken
      ? sendMessage(
          {
            createdAt: Date.now(),
            text: message,
            user: myId,
            source: recordToken,
            type: db.AUDIO_MESSAGE,
          },
          messages,
          documentName,
        )
      : sendMessage(
          {
            createdAt: Date.now(),
            text: message,
            user: myId,
          },
          messages,
          documentName,
        );
  };

  useEffect(() => {
    !checkMicrophone() && requestMicrophone();
  }, []);

  useEffect(() => {
    return subscribeOnNewMessages(setMessages, documentName);
  }, [documentName]);

  return (
    <ImageBackground style={styles.backgroundStyle} source={BG}>
      <FlatList
        style={{marginTop: 50}}
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
        <Recorder onFileSaved={async token => setRecordToken(token)} />
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
