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
        style={{flex: 1, backgroundColor: '#ffffff'}}
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
        {/* Bottom View */}
        <View style={styles.bottomView}>
          <View style={{padding: 40}}>
            <Text style={{color: '#4633A1', fontSize: 34}}>Welcome</Text>
            <Text>
              Don't have an account?
              <TouchableOpacity
                style={{paddingTop: 7}}
                onPress={() => {
                  navigation.replace('RegisterScreen');
                }}>
                <Text style={{color: 'red', fontStyle: 'italic'}}>
                  Register now
                </Text>
              </TouchableOpacity>
            </Text>
            <View style={{marginTop: 25}}>
              {/* Bottom View */}
              <View>
                <Stack space={4} w="100%" alignItems="center">
                  <Input
                    w={{
                      base: '100%',
                    }}
                    InputLeftElement={
                      <Icon
                        as={<MaterialIcons name="person" />}
                        size={5}
                        ml="2"
                        color="muted.400"
                      />
                    }
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                  />
                  <Input
                    w={{
                      base: '100%',
                      md: '25%',
                    }}
                    InputRightElement={
                      <Icon
                        as={<MaterialIcons name="visibility-off" />}
                        size={5}
                        mr="2"
                        color="muted.400"
                      />
                    }
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                  />
                </Stack>
                <View>
                  {/* Buttons  */}
                  <View>
                    <CustomButton text={'SIGN IN'} onPress={handleLogin} />
                  </View>
                </View>
              </View>
            </View>
            <View></View>
          </View>
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
  brandViewText: {
    color: '#e5e5e5',
    fontSize: 40,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: '#ffffff',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  textInput: {
    alignSelf: 'stretch',

    borderBottomColor: '#000',

    borderBottomColor: '#000', // Add this to specify bottom border color
    borderBottomWidth: 2, // Add this to specify bottom border thickness
  },
});
