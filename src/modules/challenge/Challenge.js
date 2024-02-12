import React, {useCallback, useState} from 'react';
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

import {text} from '../../styles/app';

import SmallCard from '../../components/widgets/SmallCard';

function Challenge({navigation}) {
  const [openCreateMatchModal, setOpenCreateMatchModal] = useState(false);
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
          <SmallCard key={iKey} />
        ))}
      </ScrollView>
      <View style={styles.modal.display.center}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={openCreateMatchModal}
          onRequestClose={() => setOpenCreateMatchModal(false)}>
          <View style={styles.modal.display.center}>
            <View style={styles.modal.container}>
              <Text style={text.text}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setOpenCreateMatchModal(false)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
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
      padding: 35,
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
