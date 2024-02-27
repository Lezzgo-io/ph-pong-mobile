import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Modal,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';

import Global from '../../util/global';
import {bgColor, button, text} from '../../styles/app';

import MatchCard from '../../components/widgets/MatchCard';
import ReceptionService from '../../services/ReceptionService';
import MatchService from '../../services/MatchService';

function Challenge({navigation}) {
  const {user} = useContext(Global);

  const [openCreateMatchModal, setOpenCreateMatchModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [versus, setVersus] = useState('1v1');
  const [matches, setMatches] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    handlePaidGameFee();
    handleListMatches();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [handlePaidGameFee, handleListMatches]);

  const handlePaidGameFee = useCallback(() => {
    let date = moment();

    ReceptionService.paidGameFee(
      {
        user_auth_uid: user.auth_uid,
        reception_date: date.format('YYYY-MM-DD'),
      },
      user.access_token,
    )
      .then(response => {
        if (!response.data.msg) {
          navigation.navigate('Validate');
        }
      })
      .catch(error => {
        console.error(JSON.stringify(error.response));
      });
  }, [user, navigation]);

  const handleListMatches = useCallback(() => {
    MatchService.list({}, user.access_token)
      .then(response => {
        setMatches(response.data);
      })
      .catch(error => {
        console.error(JSON.stringify(error.response));
      })
      .finally(() => {
        setOpenCreateMatchModal(false);
      });
  }, [user]);

  const handleCreateMatch = useCallback(() => {
    MatchService.create(
      {type: versus, creator_auth_uid: user.auth_uid},
      user.access_token,
    )
      .then(() => {
        handleListMatches();
      })
      .catch(error => {
        console.error(JSON.stringify(error.response));
      })
      .finally(() => {
        setOpenCreateMatchModal(false);
      });
  }, [versus, user, handleListMatches]);

  useEffect(() => {
    handlePaidGameFee();
    handleListMatches();
  }, [handlePaidGameFee, handleListMatches]);

  return (
    <SafeAreaView style={styles.view.safeArea}>
      <ScrollView
        contentContainerStyle={styles.view.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text style={[text.title, text.color.black]}>Challenge</Text>
        <TouchableOpacity onPress={() => setOpenCreateMatchModal(true)}>
          <View style={[styles.card.container, styles.card.bgColor.red]}>
            <Text style={[text.h1, text.color.white]}>CREATE A MATCH</Text>
          </View>
        </TouchableOpacity>
        <Text style={[text.title, text.color.black]}>Join a Match</Text>
        {matches?.map((i, iKey) => (
          <View key={iKey}>
            <Text style={[text.label, text.color.grey]}>
              Match #{iKey + 1}: {i.doc_uid}
            </Text>
            <MatchCard data={i} />
          </View>
        ))}
      </ScrollView>
      <View style={modal.display.center}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={openCreateMatchModal}
          onRequestClose={() => setOpenCreateMatchModal(false)}>
          <View style={modal.display.center}>
            <View style={modal.container}>
              <View>
                <TouchableOpacity
                  style={[button.contained, bgColor.blue]}
                  onPress={() => setVersus('1v1')}>
                  <Text style={[text.normal, text.color.white]}>1v1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[button.contained, bgColor.blue]}
                  onPress={() => setVersus('2v2')}>
                  <Text style={[text.normal, text.color.white]}>2v2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[button.contained, bgColor.blue]}
                  onPress={() => setVersus('3v3')}>
                  <Text style={[text.normal, text.color.white]}>3v3</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[button.contained, bgColor.blue]}
                  onPress={() => setVersus('4v4')}>
                  <Text style={[text.normal, text.color.white]}>4v4</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[button.contained, bgColor.blue]}
                  onPress={() => setVersus('5v5')}>
                  <Text style={[text.normal, text.color.white]}>5v5</Text>
                </TouchableOpacity>
              </View>
              <Text style={[text.h1, text.color.black]}>{versus}</Text>
              <View style={[modal.footer]}>
                <TouchableOpacity
                  style={[button.contained, bgColor.grey]}
                  onPress={() => setOpenCreateMatchModal(false)}>
                  <Text style={[text.h1, text.color.black]}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[button.contained, bgColor.green]}
                  onPress={() => handleCreateMatch()}>
                  <Text style={[text.h1, text.color.black]}>Create</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
      dispay: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 128,
      marginBottom: 24,
      padding: 16,
      borderRadius: 15,
    },
    bgColor: {
      red: {backgroundColor: '#c10b22'},
      blue: {backgroundColor: '#1a439f'},
    },
  },
});

const modal = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    paddingLeft: 48,
    paddingRight: 48,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  display: {
    full: {},
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Challenge;
