import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Global from '../../util/global';
import {text} from '../../styles/app';

import JoinMatchCard from '../../components/widgets/JoinMatchCard';
import MatchService from '../../services/MatchService';

function JoinMatch({navigation}) {
  const {user} = useContext(Global);

  const [refreshing, setRefreshing] = useState(false);

  const [matches, setMatches] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    handleListMatches();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [handleListMatches]);

  const handleListMatches = useCallback(() => {
    MatchService.list({}, user.access_token)
      .then(response => {
        let result = response.data.filter(i => i.paid);
        setMatches(result);
      })
      .catch(error => {
        console.error(JSON.stringify(error));
      });
  }, [user]);

  const handleJoinMatch = useCallback(
    match => {
      MatchService.join(
        {
          player_auth_uid: user.auth_uid,
          player_first_name: user.first_name,
          player_last_name: user.last_name,
          player_email: user.email,
          player_mobile: user.mobile,
        },
        match.doc_uid,
        user.access_token,
      )
        .then(response => {
          Alert.alert('Success', 'Wait for the game to start');
        })
        .catch(error => {
          console.error(JSON.stringify(error.response.data));

          if (error.response.status === 422) {
            Alert.alert('Error', error.response.data.msg);
          } else {
            Alert.alert('Error', 'Oops! Something went wrong');
          }
        });
    },
    [user],
  );

  useEffect(() => {
    handleListMatches();
  }, [handleListMatches]);

  return (
    <SafeAreaView style={styles.view.safeArea}>
      <ScrollView
        contentContainerStyle={styles.view.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text style={[text.title, text.color.black]}>Match List</Text>
        {matches
          ?.sort((a, b) => b.date_paid_unix - a.date_paid_unix)
          .map((i, iKey) => (
            <TouchableOpacity key={iKey} onPress={() => handleJoinMatch(i)}>
              <JoinMatchCard data={i} />
            </TouchableOpacity>
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
