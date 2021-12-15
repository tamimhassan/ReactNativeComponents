import React, { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const Images = Array.from({ length: 10 }).map((_, i) => {
  return {
    id: i,
    image: `https://picsum.photos/1440/2842?random=${i}`,
  };
});

const Window = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
};
const SPACING = 10;
const IMAGE_SIZE = 80;
const COLOR = {
  WHITE: '#FFF',
  TRANSPARENT: 'transparent',
};

const GalleryView = () => {
  const topRef = useRef();
  const thumbRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToActiveIndex = index => {
    setActiveIndex(index);

    topRef?.current?.scrollToOffset({
      offset: index * Window.width,
      animated: true,
    });

    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > Window.width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset:
          index * (IMAGE_SIZE + SPACING) - Window.width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
    	thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  if (!Images) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.screen}>
      <FlatList
        horizontal
        ref={topRef}
        data={Images}
        pagingEnabled
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e => {
          scrollToActiveIndex(
            Math.round(e.nativeEvent.contentOffset.x / Window.width),
          );
        }}
        renderItem={({ item }) => {
          return (
            <View style={{ height: Window.height, width: Window.width }}>
              <Image
                source={{ uri: item.image }}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
      />
      <FlatList
        ref={thumbRef}
        data={Images}
        keyExtractor={item => item.id}
        horizontal
        style={styles.secondFlatliststyle}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
              <Image
                source={{ uri: item.image }}
                style={[
                  styles.smallImageStyle,
                  {
                    borderColor:
                      activeIndex === index ? COLOR.WHITE : COLOR.TRANSPARENT,
                  },
                ]}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default GalleryView;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#000' },

  secondFlatliststyle: {
    position: 'absolute',
    bottom: 50,
  },

  smallImageStyle: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 12,
    marginRight: SPACING,
    borderWidth: 2,
  },
});
