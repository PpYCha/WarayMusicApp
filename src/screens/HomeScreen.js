import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {firebase} from '@react-native-firebase/database';
import {useIsFocused} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const HomeScreen = ({navigation}) => {
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
    console.log(item.url);

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          //   navigation.navigate('ViewSongSceen', {
          //     artist: item.artist,
          //     description: item.description,
          //     id: item.id,
          //     lyrics: item.lyrics,
          //     title: item.title,
          //     url: item.url,
          //     userId: item.userId,
          //     verifiedSOng: item.verifiedSOng,
          //     key: item.key,
          console.log('whole flatlist');
        }}>
        <Image source={{uri: item.artwork}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.artist}>{item.artist}</Text>
        </View>
        <FontAwesome5
          name="play"
          size={20}
          color="#888888"
          style={styles.icon}
          onPress={() => {
            console.log('play button');
            navigation.navigate('PlaySongScreen', {
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
          }}
        />
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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, margin: 10},
  item: {
    padding: 5,
    marginVertical: 3,
    marginHorizontal: 6,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    alignContent: 'space-between',
  },
  textContainer: {flex: 4, margin: 5, padding: 5, alignItems: 'flex-start'},
  title: {fontSize: 20, textAlign: 'center'},
  artist: {fontSize: 15, textAlign: 'center'},
  image: {width: 50, height: 50, flex: 1, padding: 5, margin: 5},
  icon: {flex: 1, padding: 5, margin: 5},
});
