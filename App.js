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
  FlatList,
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

  const newKey = (num) => {
    console.log(typeof num);
    let keyNum = Number.parseInt(num, 10);
    let addKeyNum = keyNum + 1;
    let result = addKeyNum.toString();
    return result;
  }

  const addTodoItems = (item) => {
    let keyValue = `${parseInt(todo[todo.length - 1].key)}`;
    setTodoItems((todo) => {
      return [{item: item, key: newKey(keyValue)}, ...todo];
    });
  };

  {console.log(todo)}
  return (
    <SafeAreaView>
      <View>
        <TextInputItems addTodoItems={addTodoItems} />
        <FlatList
          data={todo}
          renderItem={(allTodo) => {
            let allItems = allTodo.item.item;
            return <Text>{allItems}</Text>;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
});

export default App;
