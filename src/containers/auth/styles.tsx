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
  inputMargin: {
    marginVertical: 5,
  },
  textInputStyle: {
    borderRadius: 3,
    borderColor: 'black',
    borderWidth: 5,
    height: 40,
    width: '80%',
    alignContent: 'center',
    marginVertical: 7,
  },
  containerStyle: {
    flexDirection: 'column',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  errorText: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
  button: {
    color: "black",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginVertical: 7,
    width: 150,
    height: 50,
  },
  buttonText:{
    color: "white"
  }
});

export default styles;
