import {getHeaderTitle} from '@react-navigation/elements';
import React from 'react';
import {Text, View} from 'react-native';
import Button from '../button';
import styles from './styles';

// ..

const Header = props => {
  const title = getHeaderTitle(props.options, props.route.name);
  return (
    <View style={styles.mainContainer}>
      {props.back ? (
        <Button
          style={styles.buttonBack}
          onPress={props.navigation.goBack}
          title="<"
        />
      ) : undefined}
      <View style={styles.fullCenter}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
};
export default Header;
