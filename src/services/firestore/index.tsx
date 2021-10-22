import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import * as db from '../../constants/db';
import {Message} from '../../types';

const getMessages = documentSnapshot => {
  return documentSnapshot.get('messages');
};

export const subscribeOnNewMessages = (setMessage, docName: string) => {
  const subscriber = firestore()
    .collection(db.COLLECTION)
    .doc(docName)
    .onSnapshot(
      QuerySnapshot => {
        setMessage(getMessages(QuerySnapshot));
      },
      error => {
        console.error(error);
      },
    );
  return () => subscriber();
};

export const getAllChats = (setChats: (chats: []) => void) => {
  const subscriber = firestore()
    .collection(db.COLLECTION)
    .onSnapshot(querySnapshot => {
      const chats: [] = [];
      querySnapshot.forEach(documentSnapshot => {
        chats.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setChats(chats);
    });
  return () => subscriber();
};

export const sendMessage = (
  message: object,
  messages: Message[],
  docName: string,
) => {
  firestore()
    .collection(db.COLLECTION)
    .doc(docName)
    .update({
      messages: [...messages, message],
    });
};

export const createNewConversation = (searchinName: string) => {
  firestore()
    .collection(db.COLLECTION)
    .add({
      id: Date.now(),
      user: `${searchinName}`,
      lastMessage: {
        createdAt: null,
        text: '',
        user: '',
      },
      messages: [],
    });
};

export const selectDocument = (convId: string) => {
  return firestore()
    .collection(db.COLLECTION)
    .where('id', '==', convId)
    .get()
    .then(({docs}) => {
      const chatId = docs[0].id;
      const chatData = docs[0].data();
      return {chatId, chatData};
    });
};
