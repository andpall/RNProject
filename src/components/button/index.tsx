import React from 'react';
import {Text, Pressable} from 'react-native';
import styles from './styles';

const Button = (props) => {
  const {
    title : string = '',
    onPress = () => {},
    textStyle = styles.buttonText,
    style = styles.button,
  } = props;

  return (
    <Pressable style={style} onPress={onPress}>
      <Text style={textStyle}>{props.title}</Text>
    </Pressable>
  );
};

export default Button