import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import {AuthContext} from '../context/AuthContext';
import {useIsFocused} from '@react-navigation/native';

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={styles.itemList}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const MenuScreen = () => {
  const [selectedId, setSelectedId] = useState(null);
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    getUser();
  }, [isFocused]);

  const getUser = async () => {
    await firebase
      .app()
      .database(
        'https://waraymusicapp-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`/users/${auth().currentUser.uid}`)
      .on('value', snapshot => {
        setUser(snapshot.val());
      });

    if (isLoading) {
      setIsLoading(false);
    }

    console.log('user image:', user.image_url);
  };

  const renderItem = ({item}) => {
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {
          if (item.title === 'Log-out') {
            auth()
              .signOut()
              .then(() => console.log('User signed out!'));
            navigation.navigate('Login');
          } else {
            navigation.navigate(item.title);
          }
        }}
        textColor={{color}}
      />
    );
  };

  return (
    <View style={styles.mainConatainer}>
      <View style={styles.imageWrapper}>
        {typeof user.image_url === 'undefined' ? (
          <Image
            style={styles.imageAvatar}
            source={require('../assets/img/avatar-default.png')}
          />
        ) : (
          <Image style={styles.imageAvatar} source={{uri: user.image_url}} />
        )}
        <Text style={styles.textName}>{user.name}</Text>
        {typeof user.user_type === 'undefined' ? (
          <Text style={styles.textName}>NORTHERN SAMAR TOURISM </Text>
        ) : (
          <Text> </Text>
        )}
        <Text style={styles.textName}>{user.user_type}</Text>
      </View>
      <View style={styles.listWrapper}>
        <FlatList
          data={
            user.user_type === 'Listener'
              ? menuListListener
              : user.user_type == 'Composer'
              ? menuListComposer
              : menuListAdmin
          }
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default MenuScreen;

const menuListAdmin = [
  {
    id: 1,
    title: 'Edit Profile',
  },
  {
    id: 2,
    title: 'Download',
  },
  {
    id: 3,
    title: 'Upload',
  },
  {
    id: 4,
    title: 'Verification',
  },
  {
    id: 5,
    title: 'Verified song and artist',
  },
  {
    id: 6,
    title: 'Log-out',
  },
];

const menuListListener = [
  {
    id: 1,
    title: 'Edit Profile',
  },
  {
    id: 2,
    title: 'Playlist',
  },
  {
    id: 3,
    title: 'Favorites',
  },
  {
    id: 4,
    title: 'Download',
  },
  {
    id: 6,
    title: 'Log-out',
  },
];

const menuListComposer = [
  {
    id: 1,
    title: 'Edit Profile',
  },
  {
    id: 2,
    title: 'Playlist',
  },
  {
    id: 3,
    title: 'Songs',
  },
  {
    id: 4,
    title: 'Upload',
  },
  {
    id: 5,
    title: 'Download',
  },
  {
    id: 6,
    title: 'Log-out',
  },
];

const styles = StyleSheet.create({
  mainConatainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#ffffff',
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageAvatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  listWrapper: {
    flex: 1,
  },
  itemList: {
    fontSize: 30,
  },
  title: {
    fontSize: 20,
    margin: 5,
  },
  textName: {
    fontSize: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
