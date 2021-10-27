import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import React, {useEffect} from 'react';
import RNFetchBlob from 'rn-fetch-blob';

const putFile = async (pathToFile: string, filename: string) => {
  const dirs = RNFetchBlob.fs.dirs;
  // const path = `${dirs.MusicDir}`;
  console.debug(
    'stoooooooooooooooooooooooooooooooooooor',
    pathToFile,
    filename,
  );
  const reference = storage().ref(`sounds/${filename}`);
  // path to existing file on filesystem
  // const pathToFile = `${utils.FilePath.CACHES_DIRECTORY}/${filename}`;
  // uploads file
  await reference.putFile(pathToFile);
  const recordToken = await reference.getDownloadURL();
  console.debug('okeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
  return recordToken;
};

export {putFile};
