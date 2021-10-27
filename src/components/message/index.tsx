import React, {useEffect, useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import moment from 'moment';
import styles from './styles';

import * as routes from '../../constants/routes';
import * as db from '../../constants/db';
import {Message} from '../../types';
import Button from '../button';
import Sound from 'react-native-sound';
import Player from '../../services/audioMsg';

interface MessageProps {
  message: Message;
  myId: string;
  mateId: string;
}

const MessageItem = (props: MessageProps) => {
  const {message, myId} = props;
  const isMyMessage = useMemo(() => myId === message.user, [myId]);

  const msInHour = 3600000;
  const formattedTime = useMemo(
    () => moment(message.createdAt + msInHour * 3).format('hh:mm:ss DD:MM'),
    [],
  );

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage ? '#DCF8C5' : 'white',
            marginLeft: isMyMessage ? 50 : 0,
            marginRight: isMyMessage ? 0 : 50,
          },
        ]}>
        {!isMyMessage && <Text style={styles.name}>{message.user}</Text>}
        <Text style={styles.message}>{message.text}</Text>
        <Text style={styles.time}>{formattedTime}</Text>
        {message.type && message.type === db.AUDIO_MESSAGE && (
          <Player source={message.source} />
        )}
      </View>
    </View>
  );
};

export default MessageItem;
