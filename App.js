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

  const editItem = (newItem) => {
    let keyValue = `${todo.length}`;
    setTodoItems(() => {
      return [...todo, {item: newItem, key: newKey(keyValue)}];
    });
  };

  return (
    <SafeAreaView>
      <View>
        <TextInputItems addTodoItems={addTodoItems} />
        <FlatList
          data={todo}
          renderItem={(allTodo) => {
            let allItems = allTodo.item.item;
            return (
              <ScrollView>
                <TouchableOpacity>
                  <Text
                    key={allTodo.item.key}
                    onPress={() => toggleModal(allTodo.item.key)}>
                    {allItems}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            );
          }}
        />
      </View>
      <Modal transparent={true} visible={toggled}>
        <View style={styles.outerModal}>
          <View style={styles.modal}>
            <DeleteOrEditModal
              todo={todo}
              selectedKey={selectedKey}
              editItem={editItem}
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
