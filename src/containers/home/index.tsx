import React from 'react';
import {View, Text, Button} from 'react-native';
import styles from './styles';

const HomeScreen: React.FC<Props> = ({navigation, route}) => {
    return (
      <View style={styles.mainContainerStyle}>
        <Text>This is main page of {route.params.login} user</Text>
        <Button
          title="Log Out"
          onPress={() => navigation.navigate('LoginScrin')}
        />
      </View>
    );
  };
 
  export default HomeScreen;