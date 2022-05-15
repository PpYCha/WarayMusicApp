import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Welcome</Text>
      <Text style={styles.text}>to</Text>
      <Text style={styles.text}>Waray Waray</Text>
      <Text style={styles.text}> Music Player</Text> */}
      <ImageBackground
        style={styles.image}
        source={require('../assets/img/backgournd.jpg')}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    // padding: 10,
    // margin: 10,
    // borderRadius: 5,
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',

    textAlign: 'center',
    fontWeight: '800',
    fontSize: 50,
    padding: 5,
    margin: 10,
  },
  image: {
    flex: 1,
  },
});
