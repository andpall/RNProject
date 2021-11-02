import Voice from '@react-native-voice/voice';
import {
  ActivityIndicator,
  Image,
  PermissionsAndroid,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import Button from '../../components/button';
import styles from './styles';

interface IProps {
  onRecord: (arg: string) => void;
}

const VoiceInput = ({onRecord}: IProps) => {
  const icon =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png';
  const [result, setResult] = useState('');
  const [isRecording, setIsRecording] = useState<boolean>(false);

  useEffect(() => {
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechError = e => {
      console.debug(e);
    };

    return () => {
      Voice.destroy().then(e => {
        Voice.removeAllListeners();
      });
    };
  }, []);

  function onSpeechEnd(e) {
    setIsRecording(false);
    setResult(e);
    onRecord(result);
  }

  function onSpeechPartialResults(e) {
    setResult(e.value[0]);
    onRecord(e.value[0]);
  }

  const startRecognizing = async () => {
    try {
      await Voice.start('en-Us');
      setIsRecording(true);
    } catch (e) {
      console.log(e);
    }
  };

  const stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
      setIsRecording(false);
      onRecord(result);
    } catch (e) {
      console.debug(e);
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: !isRecording ? '#c4c8cc' : 'pink',
      }}>
      <Button
        onPress={!isRecording ? startRecognizing : stopRecognizing}
        style={{
          backgroundColor: !isRecording ? '#c4c8cc' : 'pink',
        }}
        imageStyle={styles.image}
        image={icon}
      />
    </View>
  );
};

export default VoiceInput;
