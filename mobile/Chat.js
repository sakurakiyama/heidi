import axios from 'axios';

import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import HeidiIcon from './assets/Heidi-Icon.png';
import UserIcon from './assets/User-Icon.png';
import Logo from './assets/Logo.png';
import { useFonts } from 'expo-font';
import { sharedStyles, heidiStyles, userStyles } from './styles';
import { PaperAirplaneIcon } from 'react-native-heroicons/solid';

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
        newMessage = inputValue;
        setInputValue('');
      } else newMessage = sample;

      if (!newMessage) {
        throw Error('Must enter a message');
      }
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
    <View style={sharedStyles.mainContainer}>
      <Image style={sharedStyles.logo} source={Logo} alt='Heidi-Logo'></Image>

      <View style={sharedStyles.chatContainer}>
        <ScrollView
          ref={chatContainerRef}
          onContentSizeChange={() =>
            chatContainerRef.current.scrollToEnd({ animated: true })
          }
        >
          <View style={sharedStyles.time}>
            <Text>Today {getTime()}</Text>
          </View>
          {allMessages.map((message) => {
            return (
              <View style={sharedStyles.messageContainer}>
                {message.sender === 'Heidi' ? (
                  <View style={sharedStyles.messageWrapper}>
                    <View style={sharedStyles.imageWrapper}>
                      <Image style={sharedStyles.icon} source={HeidiIcon} />
                    </View>
                    <View style={sharedStyles.messageContentWrapper}>
                      <View style={heidiStyles.messageBubble}>
                        <Text shared={sharedStyles.font}>
                          {message.content}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={sharedStyles.messageWrapper}>
                    <View style={sharedStyles.messageContentWrapper}>
                      <View style={userStyles.messageBubble}>
                        <Text style={userStyles.messageText}>
                          {message.content}
                        </Text>
                      </View>
                    </View>
                    <View style={sharedStyles.imageWrapper}>
                      <Image style={sharedStyles.icon} source={UserIcon} />
                    </View>
                  </View>
                )}
              </View>
            );
          })}
          {allMessages.length === 1 ? (
            <View style={sharedStyles.sampleButtonContainer}>
              <Text style={{ textAlign: 'center' }}>
                Not sure what to ask Heidi? Try one of the wines below.
              </Text>
              <TouchableOpacity
                style={sharedStyles.sampleButton}
                onPress={() => handleSample('Gulp Orange Wine Halo 2022')}
              >
                <Text style={sharedStyles.sampleButtonText}>
                  Gulp Orange Wine Halo 2022
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={sharedStyles.sampleButton}
                onPress={() => {
                  handleSample('Caymus Napa Valley Cabernet Sauvignon 2021');
                }}
              >
                <Text style={sharedStyles.sampleButtonText}>
                  Caymus Napa Valley Cabernet Sauvignon 2021
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={sharedStyles.sampleButton}
                onPress={() =>
                  handleSample(
                    "Château d'Esclans Whispering Angel Côtes de Provence Rose"
                  )
                }
              >
                <Text style={sharedStyles.sampleButtonText}>
                  Château d'Esclans Whispering Angel Côtes de Provence Rose
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </ScrollView>
        <View style={sharedStyles.inputContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '80%',
            }}
          >
            <TextInput
              style={sharedStyles.input}
              onChangeText={(newText) => setInputValue(newText)}
              value={inputValue}
              placeholder='Ask Heidi...'
            ></TextInput>
            <TouchableOpacity
              style={sharedStyles.sendButton}
              onPress={() => handleSubmit()}
            >
              <PaperAirplaneIcon fill='black' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
