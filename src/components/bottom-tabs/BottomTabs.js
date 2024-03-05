import React, {useCallback, useContext} from 'react';
import {StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Global from '../../util/global';

import CustomTab from './CustomTab';

import Home from '../../modules/home/Home';
import Profile from '../../modules/profile/Profile';
import Challenge from '../../modules/challenge/Challenge';
import JoinMatch from '../../modules/challenge/JoinMatch';
import Nfts from '../../modules/nfts/Nfts';
import Menu from '../../modules/menu/Menu';
import Register from '../../modules/auth/Register';
import Login from '../../modules/auth/Login';

function BottomTabs() {
  const {user} = useContext(Global);

  const Tab = createBottomTabNavigator();
  const tabComponent = useCallback(props => <CustomTab {...props} />, []);

  return (
    <Tab.Navigator
      tabBar={tabComponent}
      swipeEnabled={true}
      screenOptions={{
        headerStyle: navigator.header,
        headerTitleStyle: navigator.title,
        headerShadowVisible: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      screenListeners={({navigation}) => ({
        state: e => {},
      })}>
      {user ? (
        <React.Fragment>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Nfts" component={Nfts} />
          <Tab.Screen name="Challenge" component={Challenge} />
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Menu" component={Menu} />

          {/* Hidden tab button */}
          <Tab.Screen name="Join Match" component={JoinMatch} />
          <Tab.Screen name="Register" component={Register} />
          <Tab.Screen name="Login" component={Login} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Register" component={Register} />
        </React.Fragment>
      )}
    </Tab.Navigator>
  );
}

const navigator = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
  },
  title: {
    fontFamily: 'comfortaa-latin-700-normal',
  },
});

export default BottomTabs;
