import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';

const SongLyricsScreen = ({route}) => {
  const {lyrics, title, artist} = route.params;
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{title}</Text>
          <Text style={styles.header}>{artist}</Text>
        </View>
        <View style={styles.lyricsContainer}>
          <Text style={styles.lyrics}>{lyrics}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SongLyricsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
    padding: 10,
    margin: 10,
  },

  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  header: {fontSize: 27, fontWeight: 'bold', color: 'black'},
  lyrics: {fontSize: 18, textAlign: 'left', color: 'black'},
  lyricsContainer: {},
});
