import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';

import Button from '../../components/button';
import RNFetchBlob from 'rn-fetch-blob';
import styles from './styles';
import {putFile} from '../storage';
import {requestPermissions} from '../permissions';
import { strings } from '../../i18n';

const audioRecorderPlayer = new AudioRecorderPlayer();

interface IProps {
  onFileSaved: (token: any) => Promise<void>
}

const Recorder = ({onFileSaved}: IProps) => {
  const dirs = RNFetchBlob.fs.dirs;
  const recordName = `${Date.now()}.mp3`;
  const path = `${dirs.CacheDir}/${recordName}`;

  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');

  const [isPressed, setIsPressed] = useState(false);

  audioRecorderPlayer.setSubscriptionDuration(0.1); // optional. Default is 0.5

  const onStartRecord = async () => {
    requestPermissions();

    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);

    audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      console.debug('record-back', e);
      setRecordSecs(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
    });
    console.debug(`uri: ${uri}`);
    setIsPressed(true);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    console.debug(result);
    setIsPressed(false);
    console.debug(recordName)
    putFile(path, recordName).then((recordToken) => onFileSaved(recordToken));
  };

  return (
    <>
      {!isPressed ? (
        <Button onPress={onStartRecord} style={styles.buttonSend} title={strings("buttons.say")} />
      ) : (
        <Button onPress={onStopRecord} style={styles.buttonSend} title={strings("buttons.stop")} />
      )}
    </>
  );
  // return {onStartRecord, onStopRecord};
};

export {Recorder};
