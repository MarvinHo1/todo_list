import React, {useState} from 'react';
import {TextInput} from 'react-native';

import {StyleSheet, Button, View} from 'react-native';

const deleteOrEditModal = ({selectedKey, todo, editItem}) => {
  let keyNum = parseInt(selectedKey, 10);
  let itemMess = todo[keyNum - 1].item;
  const [value, onChangeText] = useState(itemMess);
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
        <Button onPress={() => console.log('delete')} title="Delete" />
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
