import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';

import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Slider from 'react-native-slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import songs from '../model/data';
import {firebase} from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import RNFetchBlob from 'rn-fetch-blob';
import {FirebaseStorageTypes} from '@react-native-firebase/storage';
import {useIsFocused} from '@react-navigation/native';
import UrlButton from '../components/UrlButton';
import auth from '@react-native-firebase/auth';
import SplashScreen from './SplashScreen';

const {width, height} = Dimensions.get('window');

const setupPlayer = async songList => {
  TrackPlayer.destroy();
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
    });
    await TrackPlayer.add(songList);
  } catch (error) {
    console.log('setup player: ', error);
  }
};

const togglePlayBack = async playBackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  console.log('Line 60:', currentTrack, playBackState, State.Playing);
  if (currentTrack != null) {
    if (playBackState == State.Paused) {
      await TrackPlayer.play();
      console.log('play pressed');
    } else {
      await TrackPlayer.pause();
      console.log('pause pressed');
    }
  }
};

const MusicPlayerScreen = ({seconds}) => {
  const playBackState = usePlaybackState();
  const progress = useProgress();
  const navigation = useNavigation();
  const [songList, setSongList] = useState();
  //   custom states
  const [songIndex, setsongIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState('off');
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork, setTrackArtwork] = useState();
  const [loading, setLoading] = useState(true);
  const [sample, setSample] = useState(false);
  const [trackLyrics, setTrackLyrics] = useState();
  const [trackUrl, setTrackUrl] = useState();
  const isFocused = useIsFocused();
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(seconds);

  // custom referecnces
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);

  //   changing the track on complete
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title, artwork, artist, lyrics, url} = track;
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
      setTrackLyrics(lyrics);
      setTrackUrl(url);
    }
  });

  const repeatIcon = () => {
    if (repeatMode == 'off') {
      return 'repeat-off';
    }

    if (repeatMode == 'track') {
      return 'repeat-once';
    }

    if (repeatMode == 'repeat') {
      return 'repeat';
    }
  };

  const changeRepeatMode = () => {
    if (repeatMode == 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track');
    }

    if (repeatMode == 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeatMode('repeat');
    }

    if (repeatMode == 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeatMode('off');
    }
  };

  const skipTo = async trackId => {
    await TrackPlayer.skip(trackId);
  };

  const fetchSongs = async () => {
    let returnArr = [];
    await firebase
      .app()
      .database(
        'https://waraymusicapp-18865-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref('/songs')
      .on('value', snapshot => {
        snapshot.forEach(childSnapshot => {
          let item = childSnapshot.val();
          item.key = childSnapshot.key;

          returnArr.push(item);
        });

        let newArray = returnArr.filter(item => item.verifiedSOng === true);
        setSongList(newArray);
        // console.log('Line 149: ', newArray);
      });
    setSample('Sampleine');

    console.log('List of songs', songList);
  };

  const loadTrack = () => {
    fetchSongs();

    try {
      setupPlayer(songList);
      scrollX.addListener(({value}) => {
        //   console.log(`ScrollX : ${value} | Device Width : ${width} `);
        const index = Math.round(value / width);
        skipTo(index);
        setsongIndex(index);
        //   console.log(`Index : ${index}`);
      });
      return () => {
        scrollX.removeAllListeners();
        TrackPlayer.destroy();
      };
    } catch (error) {
      console.log('useEffect', error);
    }
    setSample(true);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchSongs();
      getUser();
      setLoading(false);
    }, 2000);
  }, [isFocused]);

  const getUser = async () => {
    await firebase
      .app()
      .database(
        'https://waraymusicapp-18865-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`/users/${auth().currentUser.uid}`)
      .on('value', snapshot => {
        setUser(snapshot.val());
      });

    if (isLoading) {
      setIsLoading(false);
    }

    console.log('user image:', user.image_url);
  };

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  const renderSongs = ({item, index}) => {
    // console.log('line 199: ', item.key);
    return (
      <Animated.View style={style.mainWrapper}>
        <View style={[style.imageWrapper, style.elevation]}>
          <Image
            //   source={item.artwork}
            source={{uri: trackArtwork}}
            style={style.musicImage}
          />
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      {loading ? (
        <SplashScreen />
      ) : (
        <>
          {/* music player section */}
          <View style={style.mainContainer}>
            {/* Image */}

            <Animated.FlatList
              ref={songSlider}
              renderItem={renderSongs}
              data={songList}
              keyExtractor={item => item.key}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {x: scrollX},
                    },
                  },
                ],
                {useNativeDriver: true},
              )}
            />

            {/* Title & Artist Name */}
            <View>
              <Text style={[style.songContent, style.songTitle]}>
                {/* {songs[songIndex].title} */ trackTitle}
              </Text>
              <Text style={[style.songContent, style.songArtist]}>
                {/* {songs[songIndex].artist} */ trackArtist}
              </Text>
            </View>

            {/* songslider */}
            <View>
              <Slider
                // style={style.progressBar}
                value={progress.position}
                minimumValue={0}
                maximumValue={progress.duration}
                thumbTintColor="#FFD369"
                minimumTrackTintColor="#FFD369"
                maximumTrackTintColor="#fff"
                onSlidingComplete={async value => {
                  await TrackPlayer.seekTo(value);
                }}
              />

              {/* Progress Durations */}
              <View style={style.progressLevelDuraiton}>
                <Text style={style.progressLabelText}>
                  {new Date(progress.position * 1000)
                    .toLocaleTimeString()
                    .substring(3)}
                </Text>
                <Text style={style.progressLabelText}>
                  {new Date((progress.duration - progress.position) * 1000)
                    .toLocaleTimeString()
                    .substring(3)}
                </Text>
              </View>
            </View>

            {/* music control */}
            <View style={style.musicControlsContainer}>
              <TouchableOpacity onPress={skipToPrevious}>
                <Ionicons
                  name="play-skip-back-outline"
                  size={35}
                  color="#FFD369"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => togglePlayBack(playBackState)}>
                <Ionicons
                  name={
                    playBackState === State.Playing
                      ? 'ios-pause-circle'
                      : 'ios-play-circle'
                  }
                  size={75}
                  color="#FFD369"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={skipToNext}>
                <Ionicons
                  name="play-skip-forward-outline"
                  size={35}
                  color="#FFD369"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* bottom section */}
          <View style={style.bottomSection}>
            <View style={style.bottomIconContainer}>
              <TouchableOpacity
                onPress={() => {
                  loadTrack();
                }}>
                <Ionicons name="refresh" size={30} color="#888888" />
              </TouchableOpacity>
              <TouchableOpacity onPress={changeRepeatMode}>
                <MaterialCommunityIcons
                  name={`${repeatIcon()}`}
                  size={30}
                  color={repeatMode !== 'off' ? '#FFD369' : '#888888'}
                />
              </TouchableOpacity>
              {typeof user.user_type === 'undefined' ? (
                <></>
              ) : (
                <UrlButton url={trackUrl} />
              )}

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SongLyricsScreen', {
                    lyrics: trackLyrics,
                    artist: trackArtist,
                    title: trackTitle,
                  });
                  // console.log('line 340:', trackLyrics);
                }}>
                <MaterialCommunityIcons
                  name="music-circle-outline"
                  size={30}
                  color="#888888"
                />
              </TouchableOpacity>
              {typeof user.user_type === 'undefined' ? (
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <MaterialCommunityIcons
                    name="login"
                    size={30}
                    color="#888888"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => navigation.navigate('MenuScreen')}>
                  <Ionicons name="menu" size={30} color="#888888" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default MusicPlayerScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSection: {
    borderTopColor: '#393E46',
    borderWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
  },

  bottomIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },

  mainWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  imageWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,
  },
  musicImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  elevation: {
    elevation: 5,

    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  songContent: {
    textAlign: 'center',
    color: '#EEEEEE',
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  songArtist: {
    fontSize: 16,
    fontWeight: '300',
  },

  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  progressLevelDuraiton: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#FFF',
  },

  musicControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    width: '60%',
  },
});
