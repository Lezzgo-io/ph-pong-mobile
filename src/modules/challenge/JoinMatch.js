import React, {useCallback, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {typography} from '../../styles/app';
import MatchCard from '../../components/widgets/MatchCard';

function JoinMatch({navigation}) {
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
        <Text style={typography.title}>Match List</Text>
        {[...Array(20)].map((i, iKey) => (
          <MatchCard key={iKey} />
        ))}
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
  card: {
    container: {
      minHeight: 128,
      marginBottom: 24,
      padding: 16,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    bgColor: {
      red: {backgroundColor: '#c10b22'},
      blue: {backgroundColor: '#1a439f'},
    },
  },
});

export default JoinMatch;
