import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const CustomButton = ({
  onPress,
  text,
  backgroundColor,
  button_type,
  ...rest
}) => {
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
    <>
      {button_type === 'Secondary' ? (
        <View>
          <TouchableOpacity
            title={text}
            style={[
              {backgroundColor: backgroundColor},
              styles.button_secondary,
              styles.button,
            ]}
            onPress={onPress}>
            <Text style={styles.text}>{text} </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <TouchableOpacity
            title={text}
            style={[{backgroundColor: backgroundColor}, styles.button]}
            onPress={onPress}>
            <Text style={styles.text}>{text} </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13,
    borderColor: '#fff',
    borderWidth: 0,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '700',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button_secondary: {
    marginBottom: 10,
  },
});

export default CustomButton;
