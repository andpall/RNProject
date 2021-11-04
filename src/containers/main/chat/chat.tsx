import React, {useState, useEffect} from 'react';
import {View, ImageBackground, FlatList, TextInput} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';

import styles from './styles';
import {strings} from '../../../i18n';
import Button from '../../../components/button';

import useAuth from '../../../hooks/useAuth';
import * as routes from '../../../constants/routes';
import * as db from '../../../constants/db';

import BG from '../../../assets/images/nebula.jpg';
import {Message, RootStackParamList} from '../../../types';
import MessageItem from '../../../components/message';
import {sendMessage, subscribeOnNewMessages} from '../../../services/firestore';
import {Recorder} from '../../../services/audioRecord';
import {
  checkMicrophone,
  requestMicrophone,
} from '../../../services/permissions';
import VoiceInput from '../../../services/voiceInput';
import useChat from '../../../hooks/useChat';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

const ChatScreen = ({route}: Props) => {
  const {documentName, myId, mateId} = route.params;
  const user = auth().currentUser;

  const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState<Message[]>([]);
  const {pushMessages, messages} = useChat();

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
    return subscribeOnNewMessages(pushMessages, documentName);
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
        <VoiceInput onRecord={(text: string) => setMessage(text)} />
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
