import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const EdtProfileScreen = ({route}) => {
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [fullname, setFullname] = useState();

  const {email1, fullName1, password1} = route.params;
  console.log(email1);

  useEffect(() => {
    setEmail(email1);
    setPassword(password1);
    setFullname(fullName1);
  }, []);

  const handleSave = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <TouchableOpacity>
          {typeof user.image_url === 'undefined' ? (
            <Image
              style={styles.imageAvatar}
              source={require('../assets/img/avatar-default.png')}
            />
          ) : (
            <Image style={styles.imageAvatar} source={{uri: user.image_url}} />
          )}
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <CustomInput
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <CustomInput
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <CustomInput
          placeholder="Fullname"
          onChangeText={text => setFullname(text)}
          value={fullname}
        />
        <CustomButton
          text={'Save'}
          backgroundColor="gray"
          onPress={() => {
            handleSave();
          }}
        />
      </View>
    </View>
  );
};

export default EdtProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageAvatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
});
