import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  fullCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackTextStyle: {
    color: 'black',
  },
  textInputStyle: {
    borderRadius: 3,
    borderColor: 'black',
    borderWidth: 5,
    height: 40,
    width: '80%',
  },
  containerStyle: {
    flexDirection: 'column',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default styles;
