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
  loginTextInputStyle: {
    borderRadius: 3,
    borderColor: 'black',
    borderWidth: 5,
    height: 40,
    width: '80%',
  },
  loginComponentStyle: {
    flexDirection: 'column',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  mainComponentStyle: {
    flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "white",
  },
});

export default styles;
