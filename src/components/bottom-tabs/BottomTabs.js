import React, {useCallback} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../../modules/home/Home';
import Profile from '../../modules/profile/Profile';

import UserIcon from '../../assets/user.png';
import HomeIcon from '../../assets/home.png';
import SwordsIcon from '../../assets/swords.png';
import MenuIcon from '../../assets/menu.png';
import NftIcon from '../../assets/nft.png';

import Challenge from '../../modules/challenge/Challenge';
import JoinMatch from '../../modules/challenge/JoinMatch';
import Nfts from '../../modules/nfts/Nfts';
import Menu from '../../modules/menu/Menu';
import Validate from '../../modules/validate/Validate';
import UserService from '../../services/UserService';
import Register from '../../modules/auth/Register';
import Login from '../../modules/auth/Login';

const CustomTab = ({state, descriptors, navigation}) => {
  const checkValidation = useCallback(() => {
    UserService.getValidation({}, '')
      .then(response => {
        console.log(response.data);
        if (!response.data.validated) {
          navigation.navigate('Validate');
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {});
  }, [navigation]);

  return (
    <View style={styles.tabHolder}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          if (route.name === 'Challenge') {
            checkValidation();
          }

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

  const options = {
    navigator: {
      headerStyle: styles.navigator.header,
      headerTitleStyle: styles.navigator.title,
      headerShadowVisible: false,
      headerShown: false,
      tabBarHideOnKeyboard: true,
    },
  };

  const tabComponent = useCallback(props => <CustomTab {...props} />, []);

  return (
    <Tab.Navigator
      tabBar={tabComponent}
      swipeEnabled={true}
      screenOptions={options.navigator}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Nfts" component={Nfts} />
      <Tab.Screen name="Challenge" component={Challenge} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Menu" component={Menu} />

      {/* Hidden tab button */}
      <Tab.Screen name="Join Match" component={JoinMatch} />
      <Tab.Screen name="Validate" component={Validate} />
      <Tab.Screen name="Register" component={Register} />
      <Tab.Screen name="Login" component={Login} />
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
