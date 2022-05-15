import React, {useCallback} from 'react';
import {
  Alert,
  Button,
  Linking,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const supportedURL = 'https://google.com';

const unsupportedURL = 'slack://open?team=123456';

// const OpenURLButton = ({url, children}) => {
//   const handlePress = useCallback(async () => {
//     // Checking if the link is supported for links with custom URL scheme.
//     const supported = await Linking.canOpenURL(url);

//     if (supported) {
//       // Opening the link with some app, if the URL scheme is "http" the web link should be opened

//       // by some browser in the mobile
//       await Linking.openURL(url);
//     } else {
//       Alert.alert(`Don't know how to open this URL: ${url}`);
//     }
//   }, [url]);
//   //   return <Button title={children} onPress={handlePress} />;
// };
// {
/* <OpenURLButton url={supportedURL}>Open Supported URL</OpenURLButton>
<OpenURLButton url={unsupportedURL}>Open Unsupported URL</OpenURLButton> */
// }
const UrlButton = ({url}) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened

      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);
  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <Ionicons name="download" size={30} color="#888888" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default UrlButton;
