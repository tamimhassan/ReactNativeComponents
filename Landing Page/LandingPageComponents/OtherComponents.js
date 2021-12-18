import React from 'react';
import { StyleSheet, Animated, View, Dimensions } from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const Indecator = ({ scrollX, length }) => {
  return (
    <View style={styles.indicatorsView}>
      {Array.from({ length }).map((_, i) => {
        const inputRange = [
          (i - 1) * windowWidth,
          i * windowWidth,
          (i + 1) * windowWidth,
        ];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={[
              styles.indicatorStyle,
              {
                opacity,
                transform: [{ scale }],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollX, bgs }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * windowWidth),
    outputRange: bgs.map(bg => bg),
  });
  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
    />
  );
};

const Square = ({ scrollX }) => {
  const YOLO = Animated.modulo(
    Animated.divide(
      Animated.modulo(scrollX, windowWidth),
      new Animated.Value(windowWidth),
    ),
    1,
  );
  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '0deg', '35deg'],
  });
  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -windowHeight, 0],
  });
  return (
    <Animated.View
      style={[
        styles.squareStyle,
        {
          transform: [{ rotate }, { translateX }],
        },
      ]}
    />
  );
};

export { Indecator, Backdrop, Square };

const styles = StyleSheet.create({
  // ----------------- indicator
  indicatorsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },

  indicatorStyle: {
    height: 10,
    width: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },

  // -------------------- Square
  squareStyle: {
    height: windowHeight,
    width: windowHeight,
    backgroundColor: '#FFF',
    borderRadius: 85,
    position: 'absolute',
    top: -windowHeight * 0.6,
    left: -windowHeight * 0.25,
  },
});
