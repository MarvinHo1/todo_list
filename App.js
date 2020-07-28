/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import TextInputItems from './components/textArea.js';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

// import console = require('console');

const App: () => React$Node = () => {
  const [todo, setTodoItems] = useState([
    { item: 'Hello', key: '1'},
    { item: 'example', key: '2'},
    { item: 'data', key: '3'}
  ]);

  const addTodoItems = (item) => {
    setTodoItems((todo) => {
      return [
        {item: item, key: `${parseInt(todo[todo.length - 1].key) + 1}`},
        ...todo,
      ];
    });
  };
  {console.log(todo)}
  return (
    <SafeAreaView>
      <View>
        <TextInputItems addTodoItems={addTodoItems} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
});

export default App;
