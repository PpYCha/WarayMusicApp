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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
