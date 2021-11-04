import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import React, {Component, useEffect, useState} from 'react';

import Button from '../../components/button';
import RNFetchBlob from 'rn-fetch-blob';
import styles from './styles';
import {putFile} from '../storage';
import {requestPermissions} from '../permissions';
import {strings} from '../../i18n';

const audioRecorderPlayer = new AudioRecorderPlayer();

interface IProps {
  onFileSaved: (token: any) => Promise<void>;
}

const Recorder = ({onFileSaved}: IProps) => {
  const dirs = RNFetchBlob.fs.dirs;

  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [isPressed, setIsPressed] = useState(false);
  const [recordName, setRecordName] = useState<string | null>(null);
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    setRecordName(`${new Date().getTime()}.mp3`);
    setPath(`${dirs.CacheDir}/${recordName}`);
  }, []);
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
    setIsPressed(false);

    putFile(path, recordName).then(recordToken => onFileSaved(recordToken));
  };

  return (
    <>
      {!isPressed ? (
        <Button
          onPress={onStartRecord}
          style={styles.buttonSend}
          title={strings('buttons.say')}
        />
      ) : (
        <Button
          onPress={onStopRecord}
          style={styles.buttonSend}
          title={strings('buttons.stop')}
        />
      )}
    </>
  );
};

export {Recorder};
