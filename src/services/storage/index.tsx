import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import React, {useEffect} from 'react';
import RNFetchBlob from 'rn-fetch-blob';

const putFile = async (pathToFile: string, filename: string) => {
  const dirs = RNFetchBlob.fs.dirs;
  // const path = `${dirs.MusicDir}`;
  const reference = storage().ref(`sounds/${filename}`);
  // const pathToFile = `${utils.FilePath.CACHES_DIRECTORY}/${filename}`;
  await reference.putFile(pathToFile);
  const recordToken = await reference.getDownloadURL();
  console.debug('loaded fine');
  return recordToken;
};

export {putFile};
