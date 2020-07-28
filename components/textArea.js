import React, { useState } from 'react';
import { TextInput } from 'react-native';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
  StatusBar,
} from 'react-native';
// import console = require('console');

const TextInputItems = ({addTodoItems}) => {
  const [value, onChangeText] = useState('Test');
  return (
    <View>
      <TextInput
        style={styles.TextInput}
        placeholder="todos"
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />
      <Button onPress={() => addTodoItems(value)} title = 'add items'/>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginTop: 20,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
  },
});

export default TextInputItems;
