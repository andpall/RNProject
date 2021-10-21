import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function getUserZipCode(documentSnapshot) {
  return documentSnapshot.get('info.address.zipcode');
}
const kek = () => {
  firestore()
    .collection('Users')
    .doc('ABC')
    .get()
    .then(documentSnapshot => getUserZipCode(documentSnapshot))
    .then(zipCode => {
      console.log('Users zip code is: ', zipCode);
    });

  firestore()
    .collection('Users')
    .add({
      name: 'Ada Lovelace',
      age: 30,
    })
    .then(() => {
      console.log('User added!');
    });
};

function onResult(QuerySnapshot) {
  console.debug('Got Users collection result.');
}

function onError(error) {
  console.error(error);
}

firestore().collection('Users').onSnapshot(onResult, onError);

function handleButtonPress() {
  if (roomName.length > 0) {
    // create new thread using firebase & firestore
    firestore()
      .collection('MESSAGE_THREADS')
      .add({
        name: roomName,
        latestMessage: {
          text: `${roomName} created. Welcome!`,
          createdAt: new Date().getTime(),
        },
      })
      .then(() => {
        navigation.navigate('ChatRoom');
      });
  }
}

export default function ChatRoom() {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('conversations')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            name: '',
            latestMessage: {text: ''},
            ...documentSnapshot.data(),
          };
        });

        setThreads(threads);
        console.log(threads);
        if (loading) {
          setLoading(false);
        }
      });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribeListener = firestore()
      .collection('conversations')
      .doc(docName)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          return data;
        });

        setMessages(messages);
      });

    return () => unsubscribeListener();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#555" />;
  }

  // ...
  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => alert('Open a message thread')}>
            <View style={styles.row}>
              <View style={styles.content}>
                <View style={styles.header}>
                  <Text style={styles.nameText}>{item.name}</Text>
                </View>
                <Text style={styles.contentText}>
                  {item.latestMessage.text.slice(0, 90)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dee2eb',
  },
  title: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 28,
    fontWeight: '500',
  },
  row: {
    paddingRight: 10,
    paddingLeft: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flexShrink: 1,
  },
  header: {
    flexDirection: 'row',
  },
  nameText: {
    fontWeight: '600',
    fontSize: 18,
    color: '#000',
  },
  dateText: {},
  contentText: {
    color: '#949494',
    fontSize: 16,
    marginTop: 2,
  },
});
