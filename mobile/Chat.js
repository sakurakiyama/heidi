import axios from 'axios';

import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import HeidiIcon from './assets/Heidi-Icon.png';
import UserIcon from './assets/User-Icon.png';
import Logo from './assets/Logo.png';
import { useFonts } from 'expo-font';

export default function Chat() {
  const getTime = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  let newMessage;

  const [inputValue, setInputValue] = useState('');
  const [allMessages, setAllMessages] = useState([
    {
      sender: 'Heidi',
      content: `What're you drinking?`,
      timeStamp: getTime(),
    },
  ]);
  const chatContainerRef = useRef(null);

  const [loaded] = useFonts({
    'Helvetica Neue': require('./assets/fonts/HelveticaNeue.ttf'),
  });
  if (!loaded) {
    return null;
  }

  const addMessage = (user) => {
    if (newMessage === undefined) return;
    if (newMessage.trim() !== '') {
      const newMessageObject = {
        sender: user,
        content: newMessage,
        timeStamp: getTime(),
      };
      setAllMessages((prevMessages) => [...prevMessages, newMessageObject]);
    }
  };

  const handleSubmit = async (sample) => {
    try {
      if (inputValue) {
        console.log('input val', inputValue);
        newMessage = inputValue;
        setInputValue('');
      } else newMessage = sample;

      addMessage('User');
      const { data: review } = await axios.post(
        'http://localhost:8080/ai/askHeidi',
        {
          message: newMessage,
        }
      );
      newMessage = review.content;
      addMessage('Heidi');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSample = (wine) => {
    handleSubmit(wine);
  };

  return (
    <View style={{ flex: 1, marginTop: '10%' }}>
      <Image
        style={{ width: 100, height: 100, marginLeft: 30 }}
        source={Logo}
      ></Image>

      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          ref={chatContainerRef}
          onContentSizeChange={() =>
            chatContainerRef.current.scrollToEnd({ animated: true })
          }
        >
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text>Today {getTime()}</Text>
          </View>
          {allMessages.map((message) => {
            return (
              <View
                style={
                  message.sender === 'Heidi'
                    ? styles.heidiMessage
                    : styles.userMessage
                }
              >
                {message.sender === 'Heidi' ? (
                  <View style={styles.heidiIconContainer}>
                    <Image style={styles.icon} source={HeidiIcon} />
                  </View>
                ) : null}
                <View
                  style={
                    message.sender === 'Heidi'
                      ? styles.heidiMessageContent
                      : styles.userMessageContent
                  }
                >
                  <View
                    style={
                      message.sender === 'Heidi'
                        ? styles.heidiMessageBubble
                        : styles.userMessageBubble
                    }
                  >
                    <Text styles={styles.font}>{message.content}</Text>
                  </View>
                </View>
                {message.sender === 'User' ? (
                  <View style={styles.userIconContainer}>
                    <Image style={styles.icon} source={UserIcon} />
                  </View>
                ) : null}
              </View>
            );
          })}
          {allMessages.length === 1 ? (
            <View style={styles.sampleButtonContainer}>
              <Text style={{ textAlign: 'center' }}>
                Not sure what to ask Heidi? Try one of the wines below.
              </Text>
              <TouchableOpacity
                style={styles.sampleButton}
                onPress={() => handleSample('Gulp Orange Wine Halo 2022')}
              >
                <Text style={styles.sampleButtonText}>
                  Gulp Orange Wine Halo 2022
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sampleButton}
                onPress={() => {
                  handleSample('Caymus Napa Valley Cabernet Sauvignon 2021');
                }}
              >
                <Text style={styles.sampleButtonText}>
                  Caymus Napa Valley Cabernet Sauvignon 2021
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sampleButton}
                onPress={() =>
                  handleSample(
                    "Château d'Esclans Whispering Angel Côtes de Provence Rose"
                  )
                }
              >
                <Text style={styles.sampleButtonText}>
                  Château d'Esclans Whispering Angel Côtes de Provence Rose
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </ScrollView>
        <View style={styles.inputContainer}>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={(newText) => setInputValue(newText)}
              value={inputValue}
              placeholder='Ask Heidi...'
            ></TextInput>
          </SafeAreaView>
          <TouchableOpacity
            style={styles.sampleButton}
            onPress={() => handleSubmit()}
          >
            <Text>Send </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Heidi Styles
  heidiIconContainer: {
    justifyContent: 'flex-start',
  },
  heidiMessageContent: {
    flex: 1,
    marginLeft: 3,
    textAlign: 'left',
    marginRight: 'auto',
  },
  heidiMessageBubble: {
    flex: 0,
    backgroundColor: '#F5F5F4',
    borderRadius: 30,
    padding: 10,
  },
  heidiMessage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  // User Styles
  userIconContainer: {
    justifyContent: 'flex-end',
  },
  userMessageContent: {
    flex: 1,
    textAlign: 'right',
    marginRight: 3,
  },
  userMessageBubble: {
    flex: 0,
    backgroundColor: '#218aff',
    borderRadius: 30,
    padding: 10,
    textAlign: 'right',
  },
  userMessage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  // General Styles
  container: {
    flex: 1,
    marginLeft: '5%',
    marginBottom: '5%',
    marginRight: '5%',
    overflow: 'scroll',
    borderRadius: 30,
    backgroundColor: 'white',
    padding: 10,
  },
  icon: {
    width: 40,
    height: 100,
    resizeMode: 'contain',
  },
  font: {
    fontFamily: 'Helvetica Neue',
  },
  sampleButton: {
    borderRadius: 50,
    margin: 2,
    borderStyle: 'solid',
    borderColor: 'black',
    backgroundColor: '#F5F5F4',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sampleButtonText: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Helvetica Neue',
  },
  sampleButtonContainer: {
    margin: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    display: 'flex',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    paddingBottom: 8,
  },
  input: {
    borderStyle: 'solid',
    borderRadius: 10,
    borderColor: 'black',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
