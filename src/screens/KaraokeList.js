import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/database';

const KaraokeList = () => {
  const [songList, setSongList] = useState();
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchSongs = async () => {
    let returnArr = [];
    await firebase
      .app()
      .database(
        'https://waraymusicapp-18865-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
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
      <TouchableOpacity style={styles.buttonContainer}>
        <Image
          style={styles.img}
          source={{
            uri: item.artwork,
          }}
        />
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.artist}>{item.artist}</Text>
        </View>
        <MaterialCommunityIcons name="microphone" size={30} />
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
    </View>
  );
};

export default KaraokeList;

const styles = StyleSheet.create({
  container: {flex: 1},
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  img: {width: 50, height: 50, borderRadius: 50},
  title: {height: 30, fontWeight: '700', color: 'black'},
  artist: {height: 20, fontWeight: '400', color: 'black'},
});
