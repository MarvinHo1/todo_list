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
  TouchableOpacity,
  Modal,
  View,
  Text,
  StatusBar,
} from 'react-native';
// import console = require('console');

// import console = require('console');

const App: () => React$Node = () => {
  const [todo, setTodoItems] = useState(
    [
      {item: 'Hello', key: '1'},
      {item: 'example', key: '2'},
      {item: 'data', key: '3'},
    ],
    true,
  );

  const [toggled, setToggled] = useState(false);

  const newKey = (num) => {
    let keyNum = Number.parseInt(num, 10);
    let addKeyNum = keyNum + 1;
    let result = addKeyNum.toString();
    return result;
  };

  const addTodoItems = (item) => {
    let keyValue = `${todo.length}`;
    setTodoItems((todo) => {
      return [{item: item, key: newKey(keyValue)}, ...todo];
    });
  };

  const toggleModal = () => {
    setToggled((toggled) => !toggled);
  }

  return (
    <SafeAreaView>
      <View>
        <TextInputItems addTodoItems={addTodoItems} />
        <FlatList
          data={todo}
          renderItem={(allTodo) => {
            let allItems = allTodo.item.item;
            return (
              <TouchableOpacity onPress={toggleModal}>
                <Text>{allItems}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <Modal transparent={true} visible={toggled}>
        <View style={styles.outerModal}>
          <View style={styles.modal}>
            <Text>Modal</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerModal: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  modal: {
    backgroundColor: 'cyan',
    margin: 50,
    padding: 40,
    borderRadius: 10,
    flex: 1,
  },
});

export default App;
