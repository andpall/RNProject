import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    color: 'grey',
    // textAlign: 'flex-start',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#c4c8cc',
    borderRadius: 1,
    backgroundColor: 'white',
    marginVertical: 0,
    width: '100%',
    height: 60,
  },
  imageContainer: {
    textAlign: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    width: 10,
    height: 10,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#c4c8cc'
  },
  lefContainer: {
    flexDirection: 'row',
    borderColor: '#c4c8cc',
    marginTop: 2,
  },
  midContainer: {
    justifyContent: 'space-around'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c4c8cc',
    marginRight: 15,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastMessage: {
    fontSize: 16,
    color: 'grey',
  },
});
export default styles;
