import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import React, {useState, useEffect} from 'react';
import {firebase} from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import CustomButton from '../components/CustomButton';
import {useIsFocused} from '@react-navigation/native';
import {background} from 'native-base/lib/typescript/theme/styled-system';

const VerificationScreen = ({navigation}) => {
  const [songList, setSongList] = useState();
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchSongs = async () => {
    let returnArr = [];
    await database()
      .ref('/songs')
      .on('value', snapshot => {
        snapshot.forEach(childSnapshot => {
          let item = childSnapshot.val();
          item.key = childSnapshot.key;

          returnArr.push(item);
        });

        // let newArray = returnArr.filter(item => item.verifiedSOng !== 'true');
        setSongList(returnArr);
        console.log('line 24', returnArr);
      });

    if (loading) {
      setLoading(false);
    }

    console.log('List of songs', songList);
  };

  useEffect(() => {
    fetchSongs();
  }, [isFocused]);

  const renderItem = ({item}) => {
    const backgroundColor = item.verifiedSOng === true ? '#B6FFCE' : '#FFA8A8';

    return (
      <TouchableOpacity
        style={[styles.item, {backgroundColor: backgroundColor}]}
        onPress={() => {
          navigation.navigate('UpdateSongScreen', {
            artist: item.artist,
            description: item.description,
            id: item.id,
            lyrics: item.lyrics,
            title: item.title,
            url: item.url,
            userId: item.userId,
            verifiedSOng: item.verifiedSOng,
            key: item.key,
          });
        }}>
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={songList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <CustomButton
        text={'Save Song'}
        backgroundColor="#42b72a"
        onPress={() => {
          handleSaveSong();
        }}
      />
    </View>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  item: {
    padding: 5,
    marginVertical: 3,
    marginHorizontal: 6,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  title: {fontSize: 20, textAlign: 'center'},
});
