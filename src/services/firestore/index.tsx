import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import * as db from '../../constants/db';

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

export const getAllChats = setChats => {
  const subscriber = firestore()
    .collection(db.COLLECTION)
    .onSnapshot(querySnapshot => {
      const chats = [];
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

export const sendMessage = (message: object, docName: string) => {
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
        createdAt: Date.now(),
        text: '',
        user: '',
      },
      messages: [{createdAt: '', text: '', user: ''}],
    });
};

export const selectDocument = (
  convId: string,
  setDocName,
  setConversation,
  setTextOfLastMessage,
) => {
  firestore()
    .collection(db.COLLECTION)
    .where('id', '==', convId)
    .get()
    .then(({docs}) => {
      const dataId = docs[0].id;
      const dataItem = docs[0].data();
      setDocName(dataId);
      setConversation(dataItem);
      setTextOfLastMessage(
        dataItem.messages[dataItem.messages.length - 1].text,
      );
    });
};
