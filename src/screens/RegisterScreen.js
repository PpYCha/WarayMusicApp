import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomButton from '../components/CustomButton';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/core';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import {firebase} from '@react-native-firebase/database';

const Register = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [items, setItems] = useState([
    {label: 'Listener', value: 'Listener'},
    {label: 'Composer', value: 'Composer'},
  ]);

  const handleSignUp = async () => {
    const imageUrl = await uploadImage();
    if (imageUrl === null) {
      imageUrl: '';
    }
    if (email != '' && password != '') {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const reference = firebase
            .app()
            .database(
              'https://waraymusicapp-default-rtdb.asia-southeast1.firebasedatabase.app/',
            )
            .ref(`/users/${auth().currentUser.uid}`)
            .add({
              email: email,
              password: password,
              name: name,
              user_type: value,
              image_url: imageUrl,
            });
          Alert.alert('Success', 'Registered Successfully');
          navigation.replace('MusicPlayerScreen');
        });
    } else {
      Alert.alert('Alert', 'Email and Password must not be empty');
    }
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/profile/${filename}`);
    const task = storageRef.putFile(uploadUri);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }

    setImage(null);
  };

  return (
    <ScrollView>
      <View style={styles.mainView}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.formContainer}>
            <View>
              <Text style={styles.text}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setEmail(text)}
                value={email}
              />
            </View>
            <View>
              <Text style={styles.text}>Password</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry
              />
            </View>
            <View>
              <Text style={styles.text}>Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setName(text)}
                value={name}
              />
            </View>
            <View>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={{marginTop: 5}}
              />
            </View>
          </View>
          <CustomButton
            text={'Upload Picture'}
            onPress={choosePhotoFromLibrary}
          />
          <View style={styles.imageWrapper}>
            {image != null ? (
              <Image style={styles.image} source={{uri: image}} />
            ) : (
              <Image
                style={{width: '100%', height: 150}}
                source={require('../assets/img/avatar-default.png')}
                resizeMode="contain"
              />
            )}
          </View>
          <CustomButton text={'SIGN UP'} onPress={handleSignUp} />
          <View>
            <TouchableOpacity
              style={{marginTop: 10}}
              onPress={() => navigation.replace('Login')}>
              <Text>Already have an Account?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    borderBottomEndRadius: 50,
    borderBottomLeftRadius: 50,
    borderColor: 'gray',
    borderWidth: 1,
  },

  formContainer: {
    alignContent: 'center',
  },
  text: {
    fontSize: 20,
  },
  input: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 5,
    borderWidth: 1,
  },
  image: {
    height: 150,
    width: '100%',

    flex: 1,
  },
});
