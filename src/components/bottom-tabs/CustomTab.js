import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import UserIcon from '../../assets/user.png';
import HomeIcon from '../../assets/home.png';
import SwordsIcon from '../../assets/swords.png';
import MenuIcon from '../../assets/menu.png';
import NftIcon from '../../assets/nft.png';

const CustomTab = ({state, descriptors, navigation}) => {
  return (
    <View style={tab.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const icon = {
          Home: HomeIcon,
          Challenge: SwordsIcon,
          Profile: UserIcon,
          Nfts: NftIcon,
          Menu: MenuIcon,
        };

        if (
          route.name === 'Join Match' ||
          route.name === 'Validate' ||
          route.name === 'Register' ||
          route.name === 'Login'
        ) {
          return '';
        } else {
          return (
            <TouchableOpacity
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={index}
              style={tab.button}>
              <Image source={icon[route.name]} style={tab.icon} />
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
};

const tab = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    backgroundColor: 'white',
  },
  button: {
    flexGrow: 1,
    alignItems: 'center',
  },
  icon: {
    width: 32,
    resizeMode: 'contain',
  },
});

export default CustomTab;
