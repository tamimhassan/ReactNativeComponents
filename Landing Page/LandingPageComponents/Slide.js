import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const { width: windowWidth } = Dimensions.get('window');

const Slide = ({ item }) => {
  return (
    <View style={styles.slideViewStyle}>
      <View style={styles.imageView}>
        <Image
          source={item.image}
          style={styles.imageStyle}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textsView}>
        <Text style={[styles.text, styles.title]}>{item.title}</Text>
        <Text style={[styles.text, styles.descroption]}>
          {item.descroption}
        </Text>
      </View>
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  slideViewStyle: {
    padding: 20,
    width: windowWidth,
    alignItems: 'center',
  },
  imageView: { flex: 0.7, justifyContent: 'center' },

  imageStyle: {
    width: windowWidth / 2,
    height: windowWidth / 2,
  },

  textsView: { flex: 0.3, justifyContent: 'center' },

  text: { color: '#FFF' },

  title: { fontSize: 28, fontWeight: '800', marginBottom: 10 },

  descroption: { fontWeight: '300' },
});
