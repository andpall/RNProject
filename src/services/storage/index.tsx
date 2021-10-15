import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';

const putFile = (filename: string) => {
  async () => {
    // path to existing file on filesystem
    const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/${filename}`;
    // uploads file
    await reference.putFile(pathToFile);
  };

  const reference = storage().ref('images');

  function listFilesAndDirectories(reference, pageToken) {
    return reference.list({pageToken}).then(result => {
      // Loop over each item
      result.items.forEach(ref => {
        console.log(ref.fullPath);
      });

      if (result.nextPageToken) {
        return listFilesAndDirectories(reference, result.nextPageToken);
      }

      return Promise.resolve();
    });
  }
};
