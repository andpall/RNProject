import React, { useMemo } from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

import * as routes from '../../constants/routes';
import {Message} from '../../types';

interface MessageProps {
  message: Message;
  myId: string;
  mateId: string;
}

const MessageItem = (props: MessageProps) => {
  const {message, myId} = props;
  const isMyMessage = useMemo(() => (myId === message.user), [myId])

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
      </View>
    </View>
  );
};

export default MessageItem;
