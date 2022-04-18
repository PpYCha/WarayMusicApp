import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

const CustomInput = ({labelValue, placeholder, onChangeText}) => {
  return (
    <>
      <TextInput
        style={styles.input}
        value={labelValue}
        placeholder={placeholder}
        onChangeText={onChangeText}></TextInput>
    </>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  multiInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
