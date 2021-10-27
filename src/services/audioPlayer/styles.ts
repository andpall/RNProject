import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  messageBox: {
    borderRadius: 5,
    padding: 10,
  },
  name: {
    color: '#616c78',
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {

  },
  time: {
    alignSelf: "flex-end",
    color: 'grey'
  },
  audioMessage:{
    color: '#616c78'
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
});

export default styles;
