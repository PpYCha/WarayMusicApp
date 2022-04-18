import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ProgressViewIOSComponent,
} from 'react-native';
import React from 'react';

const MultiInput = ({labelValue, placeholder, ...props}) => {
  return (
    <>
      <TextInput
        value={labelValue}
        multiline
        numberOfLines={6}
        placeholder={placeholder}
        maxLength={300}
        style={styles.multiInput}
      />
    </>
  );
};

export default MultiInput;

const styles = StyleSheet.create({
  multiInput: {
    borderWidth: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
