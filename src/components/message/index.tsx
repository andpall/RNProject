import React, {useMemo} from 'react';
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
  const isMyMessage = useMemo(() => myId === message.user, [myId]);

  const calculateDate = () => {
    const msInHour = 3600000;
    const date = new Date(message.createdAt + msInHour * 3);
    const month = (date.getMonth()+1).toString();
    const days = date.getDate().toString();
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString();
    const seconds = date.getSeconds().toString();
    return hours + ':' + minutes + ':' + seconds + "  " + days + '/' + month;
  };
  const formattedTime = useMemo(calculateDate, []);

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
      </View>
    </View>
  );
};

export default MessageItem;
