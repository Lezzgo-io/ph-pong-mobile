import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Modal,
  Pressable,
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

function Challenge({navigation}) {
  const {user} = useContext(Global);

  const [openCreateMatchModal, setOpenCreateMatchModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    handlePaidGameFee();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [handlePaidGameFee]);

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

  useEffect(() => {
    handlePaidGameFee();
  }, [handlePaidGameFee]);

  return (
    <SafeAreaView style={styles.view.safeArea}>
      <ScrollView
        contentContainerStyle={styles.view.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text style={[text.title, text.color.black]}>Challenge</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Join Match')}>
          <View style={[styles.card.container, styles.card.bgColor.blue]}>
            <Text style={[text.h1, text.color.white]}>JOIN A MATCH</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOpenCreateMatchModal(true)}>
          <View style={[styles.card.container, styles.card.bgColor.red]}>
            <Text style={[text.h1, text.color.white]}>CREATE A MATCH</Text>
          </View>
        </TouchableOpacity>
        <Text style={[text.h1, text.color.black]}>Recent matches</Text>
        {[...Array(8)].map((i, iKey) => (
          <MatchCard key={iKey} />
        ))}
      </ScrollView>
      <View style={styles.modal.display.center}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={openCreateMatchModal}
          onRequestClose={() => setOpenCreateMatchModal(false)}>
          <View style={styles.modal.display.center}>
            <View style={styles.modal.container}>
              <Text style={[text.h1, text.color.black]}>Coming soon...</Text>
              <Pressable
                style={[button.contained, bgColor.grey]}
                onPress={() => setOpenCreateMatchModal(false)}>
                <Text style={[text.h1, text.color.black]}>Close</Text>
              </Pressable>
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
  modal: {
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
  },
});

export default Challenge;
