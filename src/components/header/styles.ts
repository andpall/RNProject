import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  transpanent: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
  },
  fullCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  buttonBack: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c4c8cc',
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 0,
    marginVertical: 0,
  },
  text: {
    color: 'grey',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
export default styles;
