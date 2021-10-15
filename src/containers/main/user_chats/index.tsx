import React, {useState} from 'react';
import {View, Text, ScrollView, TextInput, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import {strings} from '../../../i18n';
import Button from '../../../components/button';
import * as routes from '../../../constants/routes';

import useAuth from '../../../hooks/useAuth';
import Converstation from '../../../components/conversation';
import {useNavigation} from '@react-navigation/core';
import { Conversation } from '../../../types';

type Chat = {
  id: string;
  name: string;
};

interface ExCompProps {
  onCall: (arg: string) => void;
}

const SearchAndAddConversation = (props: ExCompProps) => {
  const {onCall} = props;
  const navigation = useNavigation();
  const [searchinName, setSearchinName] = useState<string>('');

  const pressHandler = () => {
    onCall(searchinName);
  };

  const handlePressBack = () => {
    navigation.navigate(routes.HOME_SCREEN);
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <Button title="<" style={styles.buttonBack} onPress={handlePressBack} />
      <TextInput style={styles.textInputStyle} onChangeText={setSearchinName} />
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
  const [chats, setChats] = useState<Conversation[]>([]);

  const addConversation = (name: string) => {
    setChats(allChats => [
      ...allChats,
      {
        id: Date.now().toString(),
        lastMessage: '',
        user: {
            id: '',
            name,
            imageUri: '',
        }
      },
    ]);
  };

  return (
    <View style={{flex: 1}}>
      <SearchAndAddConversation onCall={addConversation} />
      <View style={{alignContent: 'flex-start'}}>
        <FlatList
          data={chats}
          renderItem={({item}) => (
            <Converstation
              key={item.id}
              mateName ={item.user.name}
            />
          )}
          inverted
        />
      </View>
    </View>
  );
};

export default UserChats;
