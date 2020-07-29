/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback} from 'react';
import TextInputItems from './components/textArea.js';
import DeleteOrEditModal from './components/edit_delete.js';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Modal,
  View,
  Text,
} from 'react-native';
// import console = require('console');
// import console = require('console');

const App: () => React$Node = () => {
  const [toggled, setToggled] = useState(false);
  const [selectedKey, setSelectedKey] = useState('');
  const [todo, setTodoItems] = useState([
    {item: 'Hello', key: '1'},
    {item: 'example', key: '2'},
    {item: 'data', key: '3'},
  ]);

  const newKey = (num) => {
    let keyNum = Number.parseInt(num, 10);
    let addKeyNum = keyNum + 1;
    let result = addKeyNum.toString();
    return result;
  };

  // Never initialize functions without useCallback
  const addTodoItems = (item) => {
    let keyValue = `${todo.length}`;
    setTodoItems(() => {
      return [...todo, {item: item, key: newKey(keyValue)}];
    });
  };

  const toggleModal = useCallback(
    (key) => {
      setToggled(() => !toggled);
      setSelectedKey(key);
    },
    [toggled],
  );

  const editItem = (newItem, key) => {
    // This is immutable, you are not suposed to do that
    todo[key - 1].item = newItem;
    setTodoItems(() => {
      // Set the new item here
      return [...todo];
    });
    setToggled(() => !toggled);
  };

  const deleteItem = (key) => {
    let newArray = todo.filter((excludeItem) => excludeItem.key !== key);
    setTodoItems(() => {
      return [...newArray];
    });
    setToggled(() => !toggled);
  };

  return (
    <SafeAreaView>
      <View>
        <TextInputItems addTodoItems={addTodoItems} />
        <ScrollView>
          <View>
            <FlatList
              data={todo}
              renderItem={(allTodo) => {
                // item.item is redundant
                let allItems = allTodo.item.item;
                return (
                  <TouchableOpacity>
                    <Text
                      key={allTodo.item.key}
                      onPress={() => toggleModal(allTodo.item.key)}>
                      {allItems}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </ScrollView>
      </View>
      // no need for ={true}
      <Modal transparent={true} visible={toggled}>
        <View style={styles.outerModal}>
          <View style={styles.modal}>
            <DeleteOrEditModal
              todo={todo}
              selectedKey={selectedKey}
              editItem={editItem}
              deleteItem={deleteItem}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerModal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
  modal: {
    backgroundColor: 'cyan',
    margin: 100,
    padding: 40,
    borderRadius: 10,
    height: 450,
    width: 350,
  },
});

export default App;
