import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import MusicPlayerScreen from './MusicPlayerScreen';

const PlaySongScreen = ({navigation, route}) => {
  const {
    artist,
    description,
    id,
    lyrics,
    title,
    url,
    userId,
    verifiedSOng,
    key,
  } = route.params;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topView}></View>
        <View style={styles.bottomView}></View>
      </View>
    </>
  );
};

export default PlaySongScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  topView: {flex: 1, backgroundColor: 'red'},
  bottomView: {flex: 1, backgroundColor: 'blue'},
});
