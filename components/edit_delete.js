import React, {useState} from 'react';
import {TextInput} from 'react-native';
// Merge into a single import
import {StyleSheet, Button, View} from 'react-native';

// Has to be Capital, otherwise JSX might think this is a string
const deleteOrEditModal = ({selectedKey, todo, editItem, deleteItem}) => {
  // useMemo()
  let itemMess = todo.filter((message) => message.key === selectedKey);
  // sometimes you use const and sometimes you use let, be consistent
  let resultMess = itemMess[0].item;
  const [value, onChangeText] = useState(resultMess);
  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder="todos"
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />
      <View style={styles.modalButtonContainer}>
        <Button onPress={() => editItem(value, selectedKey)} title="Edit" />
        <Button onPress={() => deleteItem(selectedKey)} title="Delete" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    overflow: 'hidden',
  },

  modalButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
  },
});

export default deleteOrEditModal;
