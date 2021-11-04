import auth, {firebase} from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {getChatsSucces} from '../../actions';

import * as db from '../../constants/db';
import {Conversation, Message} from '../../types';

const getMessages = (
  documentSnapshot: FirebaseFirestoreTypes.DocumentSnapshot,
) => {
  return documentSnapshot.get('messages');
};

export const subscribeOnNewMessages = (
  setMessages: (arg: any) => void,
  documentName: string,
) => {
  const ref = firestore().collection(db.COLLECTION).doc(documentName);
  const subscriber = ref.onSnapshot(
    DocumentSnapshot => {
      setMessages(DocumentSnapshot.get('messages'));
    },
    error => {
      console.error(error);
    },
  );
  return () => subscriber();
};

export const subscribeOnChats = (setChats: (chats: Conversation[]) => void) => {
  const ref = firestore().collection(db.COLLECTION);
  const subscriber = ref.onSnapshot(querySnapshot => {
    const chats: any[] = [];
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

export const getChats = async () => {
  const ref = firestore().collection(db.COLLECTION);
  const chats = (await ref.get()).docs.map(item => {
    return item.data();
  });
  return chats;
};

export const sendMessage = (
  message: Message,
  messages: Message[],
  documentName: string,
) => {
  firestore()
    .collection(db.COLLECTION)
    .doc(documentName)
    .update({
      messages: [...messages, message],
    });
};

export const createNewConversation = (searchinName: string) => {
  const newChat: Conversation = {
    id: Date.now(),
    user: `${searchinName}`,
    lastMessage: null,
    messages: [],
  };
  firestore().collection(db.COLLECTION).add(newChat);
};

export const selectDocument = (convId: number) => {
  return firestore()
    .collection(db.COLLECTION)
    .where('id', '==', convId)
    .get()
    .then(({docs}) => {
      const chatDocumentName = docs[0].id;
      const chatData = docs[0].data();
      return {chatDocumentName, chatData};
    });
};
