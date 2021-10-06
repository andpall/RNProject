import React from 'react';
import {Button, View, StyleSheet, Text} from 'react-native';

const MainScrin = ({navigation, route}) => {
  return (
    <View style = {styles.componentStyle}>
      <Text>This is main page of {route.params.login} user</Text>
      <Button
        title="Log Out"
        onPress={() => navigation.navigate('LoginScrin')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  componentStyle: {
    flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "white",
  },
});
export default MainScrin;
