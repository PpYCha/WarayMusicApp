import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomButton from '../components/CustomButton';
import AddEditSongScreen from './AddEditSongScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import KaraokeList from './KaraokeList';

const {width, height} = Dimensions.get('window');

const KaraokeScreen = ({navigation}) => {
  const [display, setDisplay] = useState('KaraokeList');
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {display === 'KaraokeList' ? (
          <>
            <KaraokeList />
          </>
        ) : (
          <>
            <AddEditSongScreen minus="1" />
          </>
        )}
      </View>
      <View style={styles.bottomContinaer}>
        <View style={styles.bottomIconContainer}>
          <TouchableOpacity onPress={() => setDisplay('KaraokeList')}>
            <MaterialIcons name="my-library-music" size={30} color="#888888" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDisplay('AddMinus')}>
            <MaterialIcons name="library-add" size={30} color="#888888" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default KaraokeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, margin: 5, padding: 5},
  topContainer: {flex: 2},
  bottomContinaer: {
    borderTopColor: '#393E46',

    width: width,
    alignItems: 'center',
    paddingVertical: 15,
  },
  bottomIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
