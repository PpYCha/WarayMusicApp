import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ProgressViewIOSComponent,
} from 'react-native';
import React from 'react';

const MultiInput = ({value, placeholder, onChangeText, ...rest}) => {
  return (
    <>
      <Text style={{color: 'black'}}>{placeholder}</Text>
      <TextInput
        value={value}
        multiline
        numberOfLines={10}
        placeholder={placeholder}
        maxLength={5000}
        style={styles.multiInput}
        onChangeText={onChangeText}
      />
    </>
  );
};

export default MultiInput;

const styles = StyleSheet.create({
  multiInput: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    textAlignVertical: 'top',
    textAlign: 'center',
    color: 'black',
  },
});
