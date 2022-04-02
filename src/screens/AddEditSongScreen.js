import React, {useState, useEffect} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
// import ImagePicker from 'react-native-image-picker';

const UselessTextInput = props => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={200}
    />
  );
};

const AddEditSongScreen = () => {
  const [songDetails, setSongDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={() => {}}
        placeholder="Song Title"
      />
      <TextInput
        style={styles.input}
        onChangeText={() => {}}
        placeholder="Artist"
      />
      <TextInput
        style={styles.input}
        onChangeText={() => {}}
        placeholder="Description"
      />

      <UselessTextInput
        multiline
        numberOfLines={4}
        onChangeText={() => {}}
        placeholder="Song Description"
      />

      <Button title="Attach Song" onPress={() => {}} />
      <Button title="Attach Lyrics Song" onPress={() => {}} />
      <Button title="Attach Image Song" onPress={() => {}} />
      <Button title="Save Song" onPress={() => {}} />
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
