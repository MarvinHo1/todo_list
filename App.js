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
    todo[key - 1].item = newItem;
    setTodoItems(() => {
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
      <View style={styles.outerContainer}>
        <TextInputItems addTodoItems={addTodoItems} />
        <ScrollView>
          <View style={styles.itemListContainer}>
            <FlatList
              data={todo}
              renderItem={(allTodo) => {
                let allItems = allTodo.item.item;
                return (
                  <TouchableOpacity>
                    <Text
                      style={styles.textStyle}
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
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
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

  itemListContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    width: '100%',
  },

  textStyle: {
    flex: 1,
    // alignItems: 'center',
    width: 400,
    height: 40,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
  },
});

export default App;
