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
import {Picker} from '@react-native-picker/picker';
import {Container} from 'native-base';
import CustomInput from '../components/CustomInput';

const Register = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState('admin');
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [address, setAddress] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');

  const handleSignUp = async () => {
    const imageUrl = await uploadImage();
    if (imageUrl === null) {
      imageUrl: '';
    }
    if (email != '' && password != '') {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const uid = auth().currentUser.uid;
          console.log('id ine:', uid);
          const reference = firebase
            .app()
            .database(
              'https://waraymusicapp-18865-default-rtdb.asia-southeast1.firebasedatabase.app/',
            )
            .ref(`/users/${uid}`)
            .set({
              email: email,
              password: password,
              name: name,
              user_type: userType,
              image_url: imageUrl,
              address: address,
              age: age,
              sex: sex,
            });

          Alert.alert('Success', 'Registered Successfully');
          navigation.replace('MusicPlayerScreen');
        })
        .catch(error => Alert.alert('Alert', `${error}`));
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

    true;
    setTransferred(0);
    setUploading;

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
        <View style={styles.container}>
          <Text style={styles.headerText}>SIGN UP</Text>

          <View>
            <CustomInput
              placeholder="Email"
              onChangeText={text => setEmail(text)}
              value={email}
            />

            <CustomInput
              placeholder="Password"
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry
            />

            <CustomInput
              placeholder="Full Name"
              onChangeText={text => setName(text)}
              value={name}
            />

            <CustomInput
              placeholder="Address"
              onChangeText={text => setAddress(text)}
              value={address}
            />

            <CustomInput
              placeholder="Age"
              onChangeText={text => setAge(text)}
              value={age}
            />

            <CustomInput
              placeholder="Sex"
              onChangeText={text => setSex(text)}
              value={sex}
            />

            <CustomInput
              placeholder="Contact Number"
              onChangeText={text => setName(text)}
              value={name}
            />

            <View style={styles.pickerContainer}>
              <Picker
                style={styles.pickerStyle}
                selectedValue={userType}
                onValueChange={itemValue => setUserType(itemValue)}>
                <Picker.Item label="Please select an option.." value="admin" />
                <Picker.Item label="Listener" value="Listener" />
                <Picker.Item label="Composer" value="Composer" />
              </Picker>
            </View>
          </View>
        </View>
        <CustomButton
          text={'Choose Profile Picture'}
          backgroundColor="gray"
          onPress={choosePhotoFromLibrary}
        />
        <View style={styles.imageWrapper}>
          {image != null ? (
            <Image style={styles.image} source={{uri: image}} />
          ) : (
            <Image
              style={{
                width: '100%',
                height: 140,
                borderRadius: 75,
              }}
              source={require('../assets/img/avatar-default.png')}
              resizeMode="contain"
            />
          )}
        </View>
        <CustomButton
          text={'SIGN UP'}
          backgroundColor="#42b72a"
          onPress={handleSignUp}
        />
        <View>
          <TouchableOpacity
            style={{marginTop: 10}}
            onPress={() => navigation.replace('Login')}>
            <Text style={styles.alreadyHaveAnAccount}>
              Already have an Account?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#EDF8ED',
    padding: 10,
  },

  container: {
    alignContent: 'center',
    flex: 1,
    backgroundColor: '#EDF8ED',
  },

  headerText: {
    fontSize: 40,
    textAlign: 'center',
    justifyContent: 'center',
    color: 'black',
    padding: 10,
  },

  pickerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
  },
  pickerStyle: {
    color: 'gray',
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 5,
  },
  image: {
    height: 140,
    width: '100%',

    flex: 1,
  },
  alreadyHaveAnAccount: {
    color: '#0000EE',
  },
});
