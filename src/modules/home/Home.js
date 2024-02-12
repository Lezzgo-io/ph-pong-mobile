import React, {useCallback, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {typography} from '../../styles/app';

import BeerpongPh from '../../assets/beerpong-ph.png';

function Home() {
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
        <Text style={typography.title}>Welcome back, Tony!</Text>
        <Image style={styles.banner.logo} source={BeerpongPh} />
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
  },
  banner: {
    logo: {
      backgroundColor: 'black',
      width: '100%',
      height: 256,
      resizeMode: 'contain',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
  },
});

export default Home;
