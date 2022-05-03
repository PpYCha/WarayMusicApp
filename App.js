import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import Login from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MusicPlayerScreen from './src/screens/MusicPlayerScreen';
import AddEditSongScreen from './src/screens/AddEditSongScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MenuScreen from './src/screens/MenuScreen';
import {AuthContext} from './AuthProvider';
import EdtProfileScreen from './src/screens/EdtProfileScreen';
import VerificationScreen from './src/screens/VerificationScreen';
import VerifiedScreen from './src/screens/VerifiedScreen';
import UpdateSongScreen from './src/screens/UpdateSongScreen';
import SongLyricsScreen from './src/screens/SongLyricsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="MusicPlayerScreen"
          component={MusicPlayerScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Upload"
          component={AddEditSongScreen}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MenuScreen"
          component={MenuScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Edit Profile"
          component={EdtProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Verification"
          component={VerificationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Verified song and artist"
          component={VerifiedScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UpdateSongScreen"
          component={UpdateSongScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SongLyricsScreen"
          component={SongLyricsScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
