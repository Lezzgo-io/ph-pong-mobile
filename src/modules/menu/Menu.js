import React, {useCallback, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {text} from '../../styles/app';

function Menu({navigation}) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
            onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
          <Text
            style={[text.h1, text.color.black]}
            onPress={() => navigation.navigate('Register')}>
            Register
          </Text>
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
