import { StyleSheet } from 'react-native';

const heidiStyles = StyleSheet.create({
  messageBubble: {
    flex: 0,
    backgroundColor: '#F5F5F4',
    borderRadius: 30,
    padding: 10,
  },
});

const userStyles = StyleSheet.create({
  messageBubble: {
    flex: 0,
    backgroundColor: '#218aff',
    borderRadius: 30,
    padding: 10,
  },
  messageText: {
    color: '#FFFFFF',
  },
});

const sharedStyles = StyleSheet.create({
  messageWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  mainContainer: {
    flex: 1,
    marginTop: '10%',
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 3,
  },
  chatContainer: {
    flex: 1,
    marginLeft: '5%',
    marginBottom: '5%',
    marginRight: '5%',
    overflow: 'scroll',
    borderRadius: 30,
    backgroundColor: 'white',
    padding: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginLeft: 30,
  },
  time: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    padding: 10,
    overflow: 'hidden',
    width: '18%',
  },
  messageContentWrapper: {
    justifyContent: 'center',
    width: '82%',
  },
  icon: {
    height: 40,
    width: 40,
    resizeMode: 'contains',
  },
  font: {
    fontFamily: 'Helvetica Neue',
  },
  sendButton: {
    justifyContent: 'center',
  },
  sampleButton: {
    borderRadius: 50,
    margin: 2,
    backgroundColor: '#F5F5F4',
    padding: 10,
  },
  sampleButtonText: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Helvetica Neue',
  },
  sampleButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  inputContainer: {
    position: 'fixed',
    bottom: 0,
    paddingBottom: 8,
  },
  input: {
    borderRadius: 10,
    width: '100%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export { sharedStyles, heidiStyles, userStyles };
