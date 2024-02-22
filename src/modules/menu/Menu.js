import React, {useCallback, useContext, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Global from '../../util/Global';

import {button, text} from '../../styles/app';
import AuthService from '../../services/AuthService';

function Menu({navigation}, props) {
  // eslint-disable-next-line no-unused-vars
  const {auth, setAuth} = useContext(Global);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleLogout = useCallback(() => {
    AuthService.logout().then(response => {
      console.log(response.data);
      setAuth(false);
    });
  }, [setAuth]);

  return (
    <SafeAreaView style={styles.view.safeArea}>
      <ScrollView
        contentContainerStyle={styles.view.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text style={[text.title, text.color.black]}>Menu</Text>
        <View style={styles.view.card.container}>
          <Text
            style={[text.h1, text.color.black]}
            onPress={() => navigation.navigate('Validate')}>
            Validate
          </Text>
          <TouchableOpacity
            style={[button.link, text.color.black]}
            onPress={() => handleLogout()}>
            <Text style={[text.h1, text.color.black]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    safeArea: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scroll: {
      marginHorizontal: 20,
    },
    card: {
      container: {
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderRadius: 15,
      },
    },
  },
  MenuImage: {
    marginBottom: 16,
    borderRadius: 100,
    width: 128,
    height: 128,
    resizeMode: 'contain',
  },
});

export default Menu;
