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
  textInputStyle: {
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
    width: '75%',
    alignContent: 'flex-start',
    marginTop: 15,
    marginHorizontal: 3,
    textAlign:'center',
    backgroundColor: 'white'
  },
  buttonNewConv: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c4c8cc',
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 25,
    marginVertical: 15,
    // padding: -50,
  },
  buttonText: {
    color: 'white',
    fontSize: 30
    // textAlign: 'center',
    // justifyContent: 'center',
    // textAlignVertical: '',
  },
  buttonTextPlus: {
    color: 'white',
    fontSize: 30,
    fontWeight: '900',
    position: 'absolute',
    // textAlign: 'center',
    // justifyContent: 'center',
    // textAlignVertical: '',
  },
  convList: {
    flexDirection: 'column',
    width: '90%',
    alignContent:'center',
    alignItems: 'center'
  }
});
export default styles;
