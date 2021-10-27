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
    error && console.debug('failed to load the sound', error);
  });

  const playPause = () => {
    audio.isPlaying()
      ? (audio.pause(), setPlaying(false))
      : (setPlaying(true),
        audio.play(success => {
          success
            ? (setPlaying(false),
              console.debug('successfully finished playing'))
            : (setPlaying(false),
              console.debug('playback failed due to audio decoding errors'));
        }));
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
        title={strings('buttons.play_message')}
        onPress={playPause}
      />
    </>
  );
};
export default Player;
