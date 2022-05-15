import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import CustomInput from '../components/CustomInput';
import MultiInput from '../components/MultiInput';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import CustomButton from '../components/CustomButton';
import RNFetchBlob from 'rn-fetch-blob';
import CheckBox from '@react-native-community/checkbox';
import {useIsFocused} from '@react-navigation/native';

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

const ViewSongSceen = ({route, navigation}) => {
  const [songDetails, setSongDetails] = useState(null);
  const [songTitle, setSongTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [songLyrics, setSongLyrics] = useState('');
  const [songDesc, setSongDesc] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileResponse, setFileResponse] = useState();
  const [user, setUser] = useState([]);
  const [firebaseUrl, setFirebaseUrl] = useState();
  const [verfiedSongStatus, setVerfiedSongStatus] = useState(false);
  const [songId, setSongId] = useState();
  const [songUserId, setSongUserId] = useState();
  const [songKey, setSongKey] = useState();
  const isFocused = useIsFocused();

  const [transferred, setTransferred] = useState(0);
  const [totalTransferred, setTotalTransferred] = useState();
  const isTrueSet = setVerfiedSongStatus === 'true';
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

  useEffect(() => {
    getUser();
    setArtistName(artist);
    setSongDesc(description);
    setSongLyrics(lyrics);
    setSongTitle(title);
    setSongId(id);
    setFirebaseUrl(url);
    setSongUserId(userId);
    setSongKey(key);

    // setVerfiedSongStatus(verifiedSOng);
  }, [isFocused]);

  const getUser = () => {
    const reference = firebase
      .app()
      .database(
        'https://waraymusicapp-18865-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`/users/${auth().currentUser.uid}`)
      .on('value', snapshot => {
        setUser(snapshot.val());
      });

    // console.log(user.image_url);
  };

  const handleChooseSong = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });
      // console.log(
      //   res[0].type, // mime type
      //   res[0].name,
      //   res[0].size,
      //   res[0].uri,
      // );
      console.log('Choosed song:', res[0].name);
      setFileResponse(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const handleSaveSong = async () => {
    // if (fileResponse != null) {
    //   const songUrl = await uploadSong();

    const reference = firebase
      .app()
      .database(
        'https://waraymusicapp-18865-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`/songs/${songKey}`)
      .update({
        title: songTitle,
        artist: artistName,
        lyrics: songLyrics,
        description: songDesc,
        url: firebaseUrl,
        userId: userId,
        id: songId,
        verifiedSOng: verfiedSongStatus,
      });
    Alert.alert('Success', 'Save song Successfully');
    setArtistName('');
    setSongTitle('');
    setSongLyrics('');
    setSongDesc('');
    // } else {
    //   Alert.alert('Fail to Save', 'Add song first');
    // }
  };

  const getPathForFirebaseStorage = async uri => {
    if (Platform.OS === 'ios') {
      return uri;
    }
    const stat = await RNFetchBlob.fs.stat(uri);
    return stat.path;
  };

  const uploadSong = async () => {
    const extension = fileResponse[0].name.split('.').pop();
    const name = fileResponse[0].name.split('.').slice(0, -1).join('.');
    let filename = name + Date.now() + '.' + extension;

    const documentUri = await getPathForFirebaseStorage(fileResponse[0].uri);

    const storageRef = storage().ref(`music/${filename}`);
    const task = storageRef.putFile(documentUri);

    setUploading(true);
    // setTransferred(0);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTotalTransferred(taskSnapshot.totalBytes);
      // setTransferred(taskSnapshot.bytesTransferred);
      setTransferred(
        Math.round(
          (taskSnapshot.bytesTransferred * 100) / taskSnapshot.totalBytes,
        ),
      );
    });

    try {
      await task;

      const url = storageRef.getDownloadURL();

      setUploading(false);
      setFileResponse(null);

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <CustomInput
          value={songTitle}
          placeholder="Song Title"
          onChangeText={text => setSongTitle(text)}
        />
        <CustomInput
          value={artistName}
          placeholder="Artist Name"
          onChangeText={text => setArtistName(text)}
        />
        <MultiInput
          value={songLyrics}
          placeholder="Song Lyrics"
          onChangeText={text => setSongLyrics(text)}
        />

        <MultiInput
          value={songDesc}
          placeholder="Song Description"
          onChangeText={text => setSongDesc(text)}
        />
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CheckBox
            disabled={false}
            value={verfiedSongStatus}
            onValueChange={newValue => setVerfiedSongStatus(newValue)}
          />
          <Text>Check if Song Verified</Text>
        </View> */}
        {/* <CustomButton
          button_type={'Secondary'}
          text={'Choose Song'}
          backgroundColor="gray"
          onPress={() => {
            handleChooseSong();
          }}
        />
        <CustomButton
          button_type={'Secondary'}
          text={'Choose Image'}
          backgroundColor="gray"
          onPress={() => {}}
        /> */}

        {/* {uploading === true ? (
          <>
            <View style={{alignContent: 'center'}}>
              <ActivityIndicator size="large" />
              <Text>{transferred}% transferred out of 100%</Text>
            </View>
          </>
        ) : (
          <CustomButton
            text={'Save Song'}
            backgroundColor="#42b72a"
            onPress={() => {
              handleSaveSong();
            }}
          />
        )} */}
      </View>
    </ScrollView>
  );
};

export default ViewSongSceen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
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
