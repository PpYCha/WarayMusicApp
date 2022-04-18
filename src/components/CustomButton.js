import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const CustomButton = ({onPress, text}) => {
  return (
    // <Pressable
    //   onPress={onPress}
    //   style={[
    //     styles.container,
    //     styles[`container_${type}`],
    //     bgColor ? {backgroundColor: bgColor} : {},
    //   ]}>
    //   <Text
    //     style={[
    //       styles.text,
    //       styles[`text_${type}`],
    //       fgColor ? {color: fgColor} : {},
    //     ]}>
    //     {text}
    //   </Text>
    // </Pressable>

    <View style={{flex: 1}}>
      <TouchableOpacity title="SIGN IN" style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{text} </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#68a0cf',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',

    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#ffffff',
  },
});

export default CustomButton;
