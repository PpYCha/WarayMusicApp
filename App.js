import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MusicPlayerScreen from './src/screens/MusicPlayerScreen';
import AddEditSongScreen from './src/screens/AddEditSongScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen name="MusicPlayerScreen" component={MusicPlayerScreen} />
        <Stack.Screen name="AddEditSongScreen" component={AddEditSongScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
