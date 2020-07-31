/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback, useRef} from 'react';
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
// import console = require('console');

const App: () => React$Node = () => {
  const [toggled, setToggled] = useState(false);
  const [selectedKey, setSelectedKey] = useState('');
  const [count, setCount] = useState(0);
  const [todo, setTodoItems] = useState([]);
  const trackEle = useRef();

  const newKey = () => {
    setCount(count + 1);
    return count.toString();
  };

  const addTodoItems = (item) => {
    setTodoItems(() => {
      return [
        ...todo,
        {item: item, key: newKey(count), backgroundColor: 'transparent'},
      ];
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
    todo[key].item = newItem;
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

  const completeTask = (key, value) => {
    todo[key].backgroundColor = 'green';
    setTodoItems(() => {
      return [...todo];
    });
    setToggled(() => !toggled);
  };

  const changeColor = (key, allitems) => {
    return todo[key].backgroundColor === undefined
      ? 'green'
      : todo[key].backgroundColor;
  };

  return (
    <SafeAreaView>
      <View style={styles.outerContainer}>
        <TextInputItems addTodoItems={addTodoItems} />
        <ScrollView>
          <View style={styles.itemListContainer}>
            <FlatList
              style={styles.flateListContainer}
              data={todo}
              renderItem={(allTodo) => {
                let allItems = allTodo.item.item;
                return (
                  <TouchableOpacity>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          backgroundColor: changeColor(
                            allTodo.item.key,
                            allItems,
                          ),
                        },
                      ]}
                      ref={trackEle}
                      key={count}
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
              completeTask={completeTask}
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
    width: '100%',
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
  flateListContainer: {
    width: '100%',
  },
  textStyle: {
    width: '100%',
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
