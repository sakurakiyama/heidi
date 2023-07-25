import { StyleSheet, Dimensions, View } from 'react-native';
import Chat from './Chat.js';
export default function App() {
  return (
    <View style={styles.container}>
      <Chat />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4d5e38',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});
