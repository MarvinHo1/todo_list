import React, {useState} from 'react';
import {TextInput} from 'react-native';

import {StyleSheet, Button, View} from 'react-native';

const TextInputItems = ({addTodoItems}) => {
  const [value, onChangeText] = useState('');
  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder="todos"
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />
      <Button onPress={() => addTodoItems(value)} title="add items" />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginTop: 20,
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
  },
});

export default TextInputItems;
