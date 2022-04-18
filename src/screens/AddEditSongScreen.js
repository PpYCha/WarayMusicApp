import React, {useState, useEffect} from 'react';
import {View, Text, Button, TextInput, StyleSheet, Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import CustomInput from '../components/CustomInput';
import MultiInput from '../components/MultiInput';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
// import ImagePicker from 'react-native-image-picker';

const UselessTextInput = props => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={300}
    />
  );
};

const AddEditSongScreen = () => {
  const [songDetails, setSongDetails] = useState(null);
  const [songTitle, setSongTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [songLyrics, setSongLyrics] = useState('');
  const [songDesc, setSongDesc] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [user, setUser] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const reference = firebase
      .app()
      .database(
        'https://waraymusicapp-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`/users/${auth().currentUser.uid}`)
      .on('value', snapshot => {
        setUser(snapshot.val());
      });

    console.log(user.image_url);
  };

  const handleSaveSong = () => {
    console.log(user);

    const reference = firebase
      .app()
      .database(
        'https://waraymusicapp-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`/songs/${auth().currentUser.uid}`)
      .set({
        songTitle: songTitle,
        artistName: artistName,
        songLyrics: songLyrics,
        songDesc: songDesc,
        userId: `${auth().currentUser.uid}`,
      });
    Alert.alert('Success', 'Added song Successfully');
  };

  return (
    <View>
      <CustomInput
        labelValue={songTitle}
        placeholder="Song Title"
        onChangeText={text => setSongTitle(text)}
      />
      <CustomInput
        labelValue={artistName}
        placeholder="Artist Name"
        onChangeText={text => setArtistName(text)}
      />

      <MultiInput
        labelValue={songLyrics}
        placeholder="Song Lyrics"
        onChangeText={text => setSongLyrics(text)}
      />

      <MultiInput
        labelValue={songDesc}
        placeholder="Song Description"
        onChangeText={text => setSongDesc(text)}
      />

      <Button title="Attach Song" onPress={() => {}} />

      <Button title="Attach Image Song" onPress={() => {}} />
      <Button
        title="Save Song"
        onPress={() => {
          handleSaveSong();
        }}
      />
    </View>
  );
};

export default AddEditSongScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  multiInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
