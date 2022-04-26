import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const EdtProfileScreen = () => {
  const [user, setUser] = useState([]);
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        {typeof user.image_url === 'undefined' ? (
          <Image
            style={styles.imageAvatar}
            source={require('../assets/img/avatar-default.png')}
          />
        ) : (
          <Image style={styles.imageAvatar} source={{uri: user.image_url}} />
        )}
      </View>
      <View style={{flex: 1}}>
        <CustomInput
          placeholder="Email"
          onChangeText={text => setName(text)}
          // value={name}
        />
        <CustomInput
          placeholder="Password"
          onChangeText={text => setName(text)}
          // value={name}
        />
        <CustomInput
          placeholder="Fullname"
          onChangeText={text => setName(text)}
          // value={name}
        />
        <CustomButton
          text={'Save'}
          backgroundColor="gray"
          // onPress={choosePhotoFromLibrary}
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
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});
