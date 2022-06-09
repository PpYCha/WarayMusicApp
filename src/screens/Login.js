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
import CustomInput from '../components/CustomInput';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // const unsubscribe = auth().onAuthStateChanged(user => {
    //   if (user) {
    //     navigation.replace('MusicPlayerScreen');
    //   }
    // });
    // return unsubscribe;
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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../assets/img/header.jpg')}
          style={styles.imageContainer}>
          {/* <View style={styles.brandView}>
            <MaterialCommunityIcons
              name="music"
              style={{color: '#ffffff', fontSize: 100}}
            /> */}
          {/* <Text style={styles.brandViewText}>WARAY WARAY MUSIC PLAYER</Text> */}
          {/* </View> */}
        </ImageBackground>

        <View style={styles.bottomView}>
          <Text style={{color: 'black', fontSize: 34}}>Welcome</Text>

          <View>
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
            </View>

            <CustomButton
              backgroundColor="#07B719"
              text={'Login'}
              onPress={handleLogin}
            />
          </View>

          <TouchableOpacity
            style={{marginTop: 10}}
            onPress={() => {
              navigation.replace('RegisterScreen');
            }}>
            <Text style={styles.createText}>Create New Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF8ED',
    alignContent: 'flex-end',
  },
  imageContainer: {
    flex: 1,
    height: Dimensions.get('window').height / 2.0,
  },
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
    //backgroundColor: '#BDEBC2',

    // borderTopStartRadius: 60,
    // borderTopEndRadius: 60,
    borderRadius: 20,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  createText: {
    color: '#076B11',
  },
});









// import {Stack, Input, Icon, NativeBaseProvider} from 'native-base';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   ImageBackground,
//   Dimensions,
//   TouchableOpacity,
//   Alert,
//   TextInput,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/core';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import React, {useEffect, useState} from 'react';
// import auth from '@react-native-firebase/auth';
// import CustomButton from '../components/CustomButton';
// import CustomInput from '../components/CustomInput';

// const Login = () => {
//   const navigation = useNavigation();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   useEffect(() => {
//     // const unsubscribe = auth().onAuthStateChanged(user => {
//     //   if (user) {
//     //     navigation.replace('MusicPlayerScreen');
//     //   }
//     // });
//     // return unsubscribe;
//   }, []);

//   const handleLogin = () => {
//     if (email != '' && password != '') {
//       auth()
//         .signInWithEmailAndPassword(email, password)
//         .then(userCredentials => {
//           const user = userCredentials.user;
//           console.log('Logged in with:', user.email);
//           navigation.replace('MusicPlayerScreen');
//         })
//         .catch(error => alert(error.message));
//     } else {
//       Alert.alert('Alert', ' Email or Password must not be empty');
//     }
//   };

//   return (
//     <NativeBaseProvider>
//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//         <ImageBackground
//           source={require('../assets/img/backgroundLogin.jpg')}
//           style={styles.imageContainer}>
//           {/* <View style={styles.brandView}>
//             <MaterialCommunityIcons
//               name="music"
//               style={{color: '#ffffff', fontSize: 100}}
//             /> */}
//           {/* <Text style={styles.brandViewText}>WARAY WARAY MUSIC PLAYER</Text> */}
//           {/* </View> */}
//         </ImageBackground>

//         <View style={styles.bottomView}>
//           <Text style={{color: 'black', fontSize: 34}}>Welcome</Text>

//           <View>
//             <View>
//               <CustomInput
//                 placeholder="Email"
//                 onChangeText={text => setEmail(text)}
//                 value={email}
//               />
//               <CustomInput
//                 placeholder="Password"
//                 onChangeText={text => setPassword(text)}
//                 value={password}
//                 secureTextEntry
//               />
//             </View>

//             <CustomButton
//               backgroundColor="#1877f2"
//               text={'Login'}
//               onPress={handleLogin}
//             />
//           </View>

//           <TouchableOpacity
//             style={{marginTop: 10}}
//             onPress={() => {
//               navigation.replace('RegisterScreen');
//             }}>
//             <Text style={styles.createText}>Create New Account</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </NativeBaseProvider>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#000000',
//     alignContent: 'flex-end',
//   },
//   imageContainer: {
//     flex: 1,
//     height: Dimensions.get('window').height / 2.0,
//   },
//   brandView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   input: {
//     backgroundColor: '#ffffff',
//     borderRadius: 10,
//     marginBottom: 15,
//     padding: 10,
//   },
//   brandViewText: {
//     color: '#e5e5e5',
//     fontSize: 40,
//     fontWeight: 'bold',
//     textTransform: 'uppercase',
//   },
//   bottomView: {
//     flex: 1.5,
//     backgroundColor: '#f0f2f5',

//     // borderTopStartRadius: 60,
//     // borderTopEndRadius: 60,
//     borderRadius: 20,
//     paddingTop: 40,
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingBottom: 10,
//   },
//   createText: {
//     color: 'black',
//   },
// });
