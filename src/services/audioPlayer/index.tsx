import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import Sound from 'react-native-sound';
import Button from '../../components/button';
import {strings} from '../../i18n';
import styles from './styles';

interface Props {
  source: string;
}

const Player = (props: Props) => {
  const {source} = props;
  const playing = useRef(false);

  const audio = new Sound(source, null, error => {
    error && console.debug('failed to load the sound', error);
  });

  const playPause = () => {
    audio.isPlaying()
      ? (playing.current = false)
      : ((playing.current = true),
        audio.play(success => {
          playing.current = false;
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
