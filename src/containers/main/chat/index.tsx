import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import {strings} from '../../../i18n';
import Button from '../../../components/button';

import useAuth from '../../../hooks/useAuth';
import * as routes from '../../../constants/routes';

import ChatMessage from '../../../components/message';
import BG from '../../../assets/images/nebula.jpg';
import { Message } from '../../../types';
import MessageItem from '../../../components/message';

interface Props {
  myId: string,
  mateId: string,
  convId: string,
}

const ChatScreen = (props: Props) => {
  const {myId, mateId, convId} = props;

  const navigation = useNavigation();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePressBack = () => {
    navigation.navigate(routes.USER_CHATS);
  };

  const handlePressSend = () => {
    
  };

  return (
    <ImageBackground style={{width: '100%', height: '100%'}} source={BG}>
      <View style={{flexDirection: 'row'}}>
        <Button title="<" style={styles.buttonBack} onPress={handlePressBack} />
      </View>
      <FlatList
        data={messages}
        renderItem={({item}) => <MessageItem myId={myId} message={item} mateId = {mateId}/>}
        inverted
      />
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={'Type a message'}
          style={styles.textInput}
          multiline
          value={message}
          onChangeText={setMessage}
        />
        <Button style={styles.buttonSend} title="send" onPress={handlePressSend} />
      </View>
    </ImageBackground>
  );
};

export default ChatScreen;
