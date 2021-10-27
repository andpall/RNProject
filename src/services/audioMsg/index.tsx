import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

// let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';

// AudioRecorder.prepareRecordingAtPath(audioPath, {
//   SampleRate: 22050,
//   Channels: 1,
//   AudioQuality: 'Low',
//   AudioEncoding: 'aac',
// });

import Sound from 'react-native-sound';
import Button from '../../components/button';
import {strings} from '../../i18n';
import styles from './styles';

const Player = props => {
  const {source} = props;

  const [playing, setPlaying] = useState(false);

  const audio = new Sound(props.source, null, error => {
    if (error) {
      console.debug('failed to load the sound', error);
      return;
    }
    // if loaded successfully
    console.debug(
      'duration in seconds: ' +
        audio.getDuration() +
        'number of channels: ' +
        audio.getNumberOfChannels(),
    );
  });

  const playPause = () => {
    if (audio.isPlaying()) {
      audio.pause();
      setPlaying(false);
    } else {
      setPlaying(true);
      audio.play(success => {
        if (success) {
          setPlaying(false);
          console.log('successfully finished playing');
        } else {
          setPlaying(false);
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
  };

  useEffect(() => {
    try {
      audio.setVolume(1);
      return () => {
        audio.release();
      };
    } catch (e) {
      console.debug(e);
    }
  }, []);

  return (
    <>
      <Button
        style={styles.audioMessage}
        textStyle={styles.name}
        title="PLAY"
        onPress={playPause}
      />
    </>
  );
};
export default Player;
