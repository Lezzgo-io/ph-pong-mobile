import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Image,
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
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

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

  const [versus, setVersus] = useState('1v1');
  const [matches, setMatches] = useState([]);
  const [match, setMatch] = useState({});

  const [camera, setCamera] = useState({
    scanning: false,
    active: false,
    device: useCameraDevice('back'),
  });

  const {hasPermission, requestPermission} = useCameraPermission();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCamera({...camera, scanning: false, active: true, hidden: false});
    handleListMatches();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [camera, handleListMatches]);

  const handleCodeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],

    onCodeScanned: codes => {
      let message = codes.map((i, iKey) => i.value);
      if (
        !camera.scanning &&
        message.includes('https://lezzgo.io/collection/philippine-pong')
      ) {
        setCamera({...camera, scanning: true, active: false});
        setModal({...modal, scannerOpen: false});

        if (Object.keys(match).length) {
          handlePayGameFee();
        }
      }
    },
  });

  const handleCameraError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);

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
        type: versus,
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

  const handlePayGameFee = useCallback(() => {
    MatchService.payGameFee({paid: true}, match.doc_uid, user.access_token)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      })
      .finally(() => {
        handleListMatches();
        setMatch({});
      });
  }, [user, match, handleListMatches]);

  useEffect(() => {
    handleListMatches();
  }, [handleListMatches]);

  if (!hasPermission) {
    requestPermission();
    return;
  }

  if (camera.device == null) {
    return (
      <View>
        <Text style={[text.title, text.color.black, text.align.center]}>
          No Camera
        </Text>
      </View>
    );
  }

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
            <View style={[card.container, card.bgColor.blue]}>
              <Image style={[card.bgImage]} source={JoinMatchCardBg} />
              <Text style={[text.h1, text.color.white]}>JOIN A MATCH</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModal({...modal, createOpen: true})}>
            <View style={[card.container, card.bgColor.red]}>
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
                      setCamera({...camera, scanning: false, active: true});
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
              <View style={[modalStyle.footer]}>
                <TouchableOpacity
                  style={[button.contained, bgColor.grey]}
                  onPress={() => setModal({...modal, createOpen: false})}>
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
      <View style={modalStyle.display.center}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modal.scannerOpen}
          onRequestClose={() => setModal({...modal, scannerOpen: false})}>
          <View style={modalStyle.display.center}>
            <View style={modalStyle.container}>
              <View style={cameraStyle.container}>
                <Camera
                  style={cameraStyle.holder}
                  device={camera.device}
                  isActive={camera.active}
                  codeScanner={handleCodeScanner}
                  key={camera.device.id}
                  onError={handleCameraError}
                />
              </View>
              <View style={[modalStyle.footer]}>
                <TouchableOpacity
                  style={[button.contained, bgColor.grey]}
                  onPress={() => {
                    setModal({...modal, scannerOpen: false});
                    setCamera({...camera, active: false});
                  }}>
                  <Text style={[text.h1, text.color.black]}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const view = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scroll: {
    marginHorizontal: 20,
  },
});

const cameraStyle = StyleSheet.create({
  container: {
    width: 256,
    height: 256,
    borderWidth: 10,
    borderColor: 'black',
    overflow: 'hidden',
  },
  holder: {
    position: 'relative',
    marginLeft: -256,
    width: 512,
    height: 512,
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
  bgColor: {
    red: {backgroundColor: '#c10b22'},
    blue: {backgroundColor: '#1a439f'},
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
