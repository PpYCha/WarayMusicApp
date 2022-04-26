import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

const CustomInput = ({value, placeholder, onChangeText, ...rest}) => {
  return (
    <>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        {...rest}
      />
    </>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  multiInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
