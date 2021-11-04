import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';

import styles from './styles';
import {strings} from '../../../i18n';
import Button from '../../../components/button';
import * as routes from '../../../constants/routes';

import useAuth from '../../../hooks/useAuth';
import Converstation from '../../../components/conversation';
import {useNavigation} from '@react-navigation/core';
import useChat from '../../../hooks/useChat';
import {
  createNewConversation,
  subscribeOnChats,
} from '../../../services/firestore';
import {Conversation, RootStackParamList} from '../../../types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';

interface Props {
  onInputName: (arg: string) => void;
  searchinName: string;
}

type ChatsNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'MyChats'
>;

const SearchAndAddConversation = (props: Props) => {
  const {onInputName, searchinName} = props;
  const navigation = useNavigation<ChatsNavigationProps>();

  const handlePressBack = () => {
    navigation.navigate(routes.HOME_SCREEN);
  };

  const pressHandler = () => {
    console.debug(searchinName);
    createNewConversation(searchinName);
  };
  return (
    <View style={{flexDirection: 'row'}}>
      <Button title="<" style={styles.buttonBack} onPress={handlePressBack} />
      <TextInput
        style={styles.textInputStyle}
        onChangeText={text => {
          onInputName(text);
        }}
      />
      <Button
        style={styles.buttonNewConv}
        textStyle={styles.buttonTextPlus}
        title="+"
        onPress={pressHandler}
      />
    </View>
  );
};

const UserChats: React.FC = () => {
  const [searchinName, setSearchinName] = useState<string>('');
  const {isLoading, fetchChats, chats, pushChats, startLoading, getChat} =
    useChat();

  useEffect(() => {
    // fetchChats();
    subscribeOnChats(pushChats);
  }, []);

  if (isLoading) {
    return <ActivityIndicator style={styles.fullCenter} />;
  }

  return (
    <View style={styles.fullFlex}>
      <SearchAndAddConversation
        onInputName={input => setSearchinName(input)}
        searchinName={searchinName}
      />
      <View style={styles.alignStart}>
        <FlatList
          data={
            chats &&
            chats.filter(chat => chat.user.indexOf(searchinName) !== -1)
          }
          renderItem={({item}) => {
            return <Converstation key={item.id} conversationFieldId={item.id} />;
          }}
          inverted
        />
      </View>
    </View>
  );
};

export default UserChats;
