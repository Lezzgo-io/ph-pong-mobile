import React, {useCallback} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../../modules/home/Home';
import Profile from '../../modules/profile/Profile';

import UserIcon from '../../assets/user.png';
import HomeIcon from '../../assets/home.png';
import SwordsIcon from '../../assets/swords.png';
import Challenge from '../../modules/challenge/Challenge';
import JoinMatch from '../../modules/challenge/JoinMatch';

const CustomTab = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.tabHolder}>
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
        };

        if (route.name === 'Join Match') {
          return '';
        } else {
          return (
            <TouchableOpacity
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={index}
              style={styles.tabButton}>
              <Image source={icon[route.name]} style={styles.tabIcon} />
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
};

function BottomTabs() {
  const Tab = createBottomTabNavigator();
  const tabComponent = useCallback(props => <CustomTab {...props} />, []);

  const options = {
    navigator: {
      headerStyle: styles.navigator.header,
      headerTitleStyle: styles.navigator.title,
      headerShadowVisible: false,
      headerShown: false,
    },
  };

  return (
    <Tab.Navigator
      tabBar={tabComponent}
      swipeEnabled={true}
      screenOptions={options.navigator}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Challenge" component={Challenge} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Join Match" component={JoinMatch} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  navigator: {
    header: {
      backgroundColor: 'transparent',
    },
    title: {
      fontFamily: 'comfortaa-latin-700-normal',
    },
  },
  tabHolder: {
    flexDirection: 'row',
    borderTopWidth: 1,
    backgroundColor: 'white',
  },
  tabButton: {
    flexGrow: 1,
    alignItems: 'center',
  },
  tabIcon: {
    width: 32,
    resizeMode: 'contain',
  },
});

export default BottomTabs;
