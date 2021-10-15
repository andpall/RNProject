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
  image: {
    backgroundColor: '#ccc',
    flex: 1,
    resizeMode: "cover",
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
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
  whiteText:{
    color:"white",
  }
});

export default styles;
