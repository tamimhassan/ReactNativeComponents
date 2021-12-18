import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';
import {
  Square,
  Backdrop,
  Indecator,
} from '../../components/LandingPageComponents/OtherComponents';
import Slide from '../../components/LandingPageComponents/Slide';

const DATA = [
  {
    id: 0,
    image: require('./../../assects/images/HL_logo_small.png'),
    title: 'Welcome To Home Library',
    descroption:
      "This app is made for you. So that you can see what's books you have in your library",
  },
  {
    id: 1,
    image: require('./../../assects/images/lp_img1.png'),
    title: 'Select your book',
    descroption:
      'Take a picture & add some details and upload it on your Library',
  },
  {
    id: 2,
    image: require('./../../assects/images/lp_img2.png'),
    title: 'Books details',
    descroption: 'See your books & library details from any where in the world',
  },
  {
    id: 3,
    image: require('./../../assects/images/lp_img3.png'),
    title: 'Adding member',
    descroption:
      'Share library name and add friends & family into your library',
  },
];

const bgs = ['#25397b', '#475ead', '#f273e8'];

const LandingPage = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.screen}>
      <Backdrop scrollX={scrollX} bgs={bgs} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        horizontal
        pagingEnabled
        scrollEventThrottle={32}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        renderItem={({ item }) => <Slide item={item} />}
      />

      <View style={styles.buttonsViewStyle}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('login')}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('create-account')}>
          <Text style={styles.buttonText}>Create account</Text>
        </TouchableOpacity>
      </View>

      <Indecator scrollX={scrollX} length={DATA.length} />
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFF' },

  buttonsViewStyle: {
    marginBottom: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ddd8e5',
  },

  buttonText: { color: '#000', fontSize: 15, fontWeight: 'bold' },
});
