import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Global from '../../util/global';
import {bgColor, button, text} from '../../styles/app';

import MatchCard from '../../components/widgets/MatchCard';
import MatchService from '../../services/MatchService';

import JoinMatchCardBg from '../../assets/join-match-card-bg-01.png';
import CreateMatchCardBg from '../../assets/create-match-card-bg.png';

function Challenge({navigation}) {
  const {user} = useContext(Global);

  const [refreshing, setRefreshing] = useState(false);

  const [modal, setModal] = useState({
    createOpen: false,
    scannerOpen: false,
  });

  const [matches, setMatches] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [match, setMatch] = useState({});

  const [branches, setBranches] = useState([
    {
      id: 'branch1',
      label: 'Branch 1',
      selected: true,
    },
    {
      id: 'branch2',
      label: 'Branch 2',
      selected: false,
    },
    {
      id: 'branch3',
      label: 'Branch 3',
      selected: false,
    },
  ]);

  const [versus, setVersus] = useState([
    {
      id: '1v1',
      label: '1 VS 1',
      selected: true,
    },
    {
      id: '2v2',
      label: '2 VS 2',
      selected: false,
    },
    {
      id: '3v3',
      label: '3 VS 3',
      selected: false,
    },
    {
      id: '4v4',
      label: '4 VS 4',
      selected: false,
    },
    {
      id: '5v5',
      label: '5 VS 5',
      selected: false,
    },
  ]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    handleListMatches();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [handleListMatches]);

  const handleListMatches = useCallback(() => {
    MatchService.getByUser(user.auth_uid, user.access_token)
      .then(response => {
        setMatches(response.data);
      })
      .catch(error => {
        console.error(JSON.stringify(error));
      });
  }, [user]);

  const handleCreateMatch = useCallback(() => {
    MatchService.create(
      {
        creator_auth_uid: user.auth_uid,
        creator_first_name: user.first_name,
        creator_last_name: user.last_name,
        creator_email: user.email,
        creator_mobile: user.mobile,
        type: versus.filter(i => i.selected)[0].id,
      },
      user.access_token,
    )
      .then(() => {
        setModal({...modal, createOpen: false});
        handleListMatches();
      })
      .catch(error => {
        console.log(JSON.stringify(error.response.data));
      });
  }, [modal, user, handleListMatches, versus]);

  const selectVersus = versusId => {
    let temp = [...versus];
    temp = temp.map(i => ({...i, selected: false}));
    let found = temp.find(i => i.id === versusId);
    found.selected = true;
    setVersus(temp);
  };

  const selectBranch = branchId => {
    let temp = [...branches];
    temp = temp.map(i => ({...i, selected: false}));
    let found = temp.find(i => i.id === branchId);
    found.selected = true;
    setBranches(temp);
  };

  useEffect(() => {
    handleListMatches();
  }, [handleListMatches]);

  return (
    <SafeAreaView style={view.safeArea}>
      <ScrollView
        contentContainerStyle={view.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          <Text style={[text.title, text.color.black]}>Challenge</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Join Match')}>
            <View style={[card.container, bgColor.blue]}>
              <Image style={[card.bgImage]} source={JoinMatchCardBg} />
              <Text style={[text.h1, text.color.white]}>JOIN A MATCH</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModal({...modal, createOpen: true})}>
            <View style={[card.container, bgColor.red]}>
              <Image style={[card.bgImage]} source={CreateMatchCardBg} />
              <Text style={[text.h1, text.color.white]}>CREATE A MATCH</Text>
            </View>
          </TouchableOpacity>
          <Text style={[text.title, text.color.black]}>My Created Match</Text>
          {matches
            ?.filter(i => i.host === user.auth_uid)
            .map((i, iKey) => (
              <View key={iKey}>
                <Text style={[text.label, text.color.grey]}>
                  Match #{iKey + 1}: {i.doc_uid}
                </Text>
                {i.paid ? (
                  <TouchableOpacity>
                    <MatchCard data={i} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setModal({...modal, scannerOpen: true});
                      setMatch(i);
                    }}>
                    <MatchCard data={i} />
                  </TouchableOpacity>
                )}
              </View>
            ))}
        </View>
      </ScrollView>
      <View style={modalStyle.display.center}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal.createOpen}
          onRequestClose={() => setModal({...modal, createOpen: false})}>
          <View style={modalStyle.display.center}>
            <View style={modalStyle.container}>
              <View>
                <Text style={[text.h1, text.color.black]}>Branch</Text>
                {branches.map((i, iKey) => (
                  <TouchableOpacity
                    key={iKey}
                    style={[
                      thisButton.versus,
                      i.selected ? bgColor.blue : bgColor.white,
                    ]}
                    onPress={() => selectBranch(i.id)}>
                    <Text
                      style={[
                        text.normal,
                        i.selected ? text.color.white : text.color.black,
                        text.align.center,
                      ]}>
                      {i.label}
                    </Text>
                  </TouchableOpacity>
                ))}
                <Text
                  style={[
                    text.h1,
                    text.color.black,
                    thisText.selectVersusLabel,
                  ]}>
                  Match Type
                </Text>
                {versus.map((i, iKey) => (
                  <TouchableOpacity
                    key={iKey}
                    style={[
                      thisButton.versus,
                      i.selected ? bgColor.blue : bgColor.white,
                    ]}
                    onPress={() => selectVersus(i.id)}>
                    <Text
                      style={[
                        text.normal,
                        i.selected ? text.color.white : text.color.black,
                        text.align.center,
                      ]}>
                      {i.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={[modalStyle.footer]}>
                <TouchableOpacity
                  style={[
                    button.contained,
                    bgColor.grey,
                    thisButton.fullWidth,
                    thisButton.footerButtons,
                  ]}
                  onPress={() => setModal({...modal, createOpen: false})}>
                  <Text style={[text.h1, text.color.black]}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    button.contained,
                    bgColor.green,
                    thisButton.fullWidth,
                    thisButton.footerButtons,
                  ]}
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

const thisButton = StyleSheet.create({
  versus: {
    minWidth: '100%',
    paddingTop: 6,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 8,
    alignItems: 'stretch',
  },
  fullWidth: {
    minWidth: '100%',
  },
  footerButtons: {
    marginBottom: 8,
  },
});

const thisText = StyleSheet.create({
  selectVersusLabel: {
    marginTop: 16,
  },
});

const view = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    paddingTop: 20,
    marginHorizontal: 20,
  },
});

const card = StyleSheet.create({
  container: {
    position: 'relative',
    dispay: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 128,
    marginBottom: 24,
    padding: 16,
    borderRadius: 15,
    overflow: 'hidden',
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    width: '140%',
    height: '140%',
    resizeMode: 'cover',
  },
});

const modalStyle = StyleSheet.create({
  container: {
    width: '70%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
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
    marginTop: 16,
    alignItems: 'center',
  },
});

export default Challenge;
