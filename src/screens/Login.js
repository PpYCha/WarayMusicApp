import {Stack, Input, Icon, NativeBaseProvider} from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import CustomButton from '../components/CustomButton';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        navigation.replace('MusicPlayerScreen');
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    if (email != '' && password != '') {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Logged in with:', user.email);
          navigation.replace('MusicPlayerScreen');
        })
        .catch(error => alert(error.message));
    } else {
      Alert.alert('Alert', ' Email or Password must not be empty');
    }
  };

  return (
    <NativeBaseProvider>
      <ScrollView
        style={{flex: 1, backgroundColor: '#f0f2f5'}}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../assets/img/backgroundLogin.jpg')}
          style={{
            height: Dimensions.get('window').height / 2.5,
          }}>
          <View style={styles.brandView}>
            <MaterialCommunityIcons
              name="music"
              style={{color: '#ffffff', fontSize: 100}}
            />
            <Text style={styles.brandViewText}>Waray Music Player</Text>
          </View>
        </ImageBackground>

        <View style={styles.bottomView}>
          <Text style={{color: 'black', fontSize: 34}}>Welcome</Text>

          <View>
            <View>
              <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={text => setEmail(text)}
                value={email}
              />
              <TextInput
                placeholder="Password"
                style={styles.input}
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry
              />
            </View>

            <CustomButton
              backgroundColor="#1877f2"
              text={'Login'}
              onPress={handleLogin}
            />
          </View>

          <TouchableOpacity
            style={{marginTop: 10}}
            onPress={() => {
              navigation.replace('RegisterScreen');
            }}>
            <Text>Create New Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Login;

const styles = StyleSheet.create({
  brandView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  brandViewText: {
    color: '#e5e5e5',
    fontSize: 40,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: '#f0f2f5',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
