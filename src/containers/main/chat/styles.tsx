import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  fullCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'white',
  },
  buttonBack: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c4c8cc',
    width: 40,
    height: 40,
    borderWidth: 0,
    borderColor: 'grey',
    borderRadius: 2,
    marginVertical: 15,
  },
  buttonSend: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c4c8cc',
    width: 40,
    height: 50,
    borderWidth: 0,
    borderColor: 'grey',
    borderRadius: 1,
    marginVertical: 0,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 0,
    backgroundColor: 'white'
  },
  textInputContainer: {
    alignItems:'flex-end',
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 5,
  },
});
export default styles;
