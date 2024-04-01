import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import UserIcon from '../../assets/bottom-tabs/user.png';
import UserIconSelected from '../../assets/bottom-tabs/user-selected.png';
import HomeIcon from '../../assets/bottom-tabs/home.png';
import HomeIconSelected from '../../assets/bottom-tabs/home-selected.png';
import SwordsIcon from '../../assets/bottom-tabs/swords.png';
import SwordsIconSelected from '../../assets/bottom-tabs/swords-selected.png';
import MenuIcon from '../../assets/bottom-tabs/menu.png';
import NftIcon from '../../assets/bottom-tabs/nft.png';
import NftIconSelected from '../../assets/bottom-tabs/nft-selected.png';
import {text} from '../../styles/app';

const CustomTab = ({state, descriptors, navigation}) => {
  const show = ['Home', 'Challenge', 'Nfts', 'Profile'];

  return (
    <View style={tab.container}>
      {state.routes
        .filter(i => show.includes(i.name))
        .map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;

          const icon = {
            Home: isFocused ? HomeIconSelected : HomeIcon,
            Nfts: isFocused ? NftIconSelected : NftIcon,
            Challenge: isFocused ? SwordsIconSelected : SwordsIcon,
            Profile: isFocused ? UserIconSelected : UserIcon,
            Menu: MenuIcon,
          };

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

          return (
            <TouchableOpacity
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={index}
              style={tab.button}>
              <Image source={icon[route.name]} style={tab.icon} />
              <Text style={[thisText.label, text.color.black]}>
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

const thisText = StyleSheet.create({
  label: {
    marginBottom: 0,
  },
});

const tab = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  button: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 12,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'stretch',
  },
});

export default CustomTab;
