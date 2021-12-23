import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View, Image, Button } from 'react-native';

const SPACING = 20;
const AVATER_SIZE = 70;
const ITEM_SIZE = AVATER_SIZE + SPACING * 3;
const BG = 'red';
const GStyle = {
  flexDirection: 'row',
  flex: 1,
  FD: 'space-between',
  BOLD: 'bold',
};

const ListitemMember = () => {
  const [Users, setUsers] = useState();

  console.log(Users);

  const getUsers = async () => {
    let users = await fetch('https://randomuser.me/api/?results=30');
    const data = await users.json();
    setUsers(data.results);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View>
      <Image
        source={{ uri: 'https://picsum.photos/1440/2842?ramdom' }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={5}
      />
      <Animated.FlatList
        data={Users}
        keyExtractor={item => item.email}
        contentContainerStyle={{ padding: SPACING }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={[
                {
                  flexDirection: GStyle.flexDirection,
                  marginBottom: SPACING,
                  backgroundColor: BG,
                  padding: SPACING,
                  borderRadius: SPACING / 2,
                  transform: [{ scale }],
                  opacity,
                },
                styles.Item,
              ]}>
              <Image
                source={{ uri: item.picture.medium }}
                style={{
                  width: AVATER_SIZE,
                  height: AVATER_SIZE,
                  borderRadius: AVATER_SIZE,
                  marginRight: SPACING / 2,
                }}
              />
              <View style={{ justifyContent: GStyle.FD, flex: GStyle.flex }}>
                <Text style={{ fontWeight: GStyle.BOLD }}>
                  {item.name.title} {item.name.first} {item.name.last}
                </Text>
                <View
                  style={{
                    flexDirection: GStyle.flexDirection,
                    justifyContent: GStyle.FD,
                    // backgroundColor: 'gray',
                  }}>
                  <Button title="Comfirm" onPress={() => {}} />
                  <Button title="Delete" onPress={() => {}} />
                </View>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default ListitemMember;

const styles = StyleSheet.create({
  Item: {
    elevation: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});
