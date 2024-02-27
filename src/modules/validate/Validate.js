import React, {useCallback, useContext, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

import Global from '../../util/global';
import {text} from '../../styles/app';

import ReceptionService from '../../services/ReceptionService';
import moment from 'moment';

function Validate({navigation}) {
  const {user} = useContext(Global);

  const [refreshing, setRefreshing] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scannerOn, setScannerOn] = useState(true);

  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setScanning(false);
    handleScanAvailable();
    handlePaidGameFee();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [handleScanAvailable, handlePaidGameFee]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],

    onCodeScanned: codes => {
      let message = codes.map((i, iKey) => i.value);

      if (
        !scanning &&
        message.includes('https://lezzgo.io/collection/philippine-pong')
      ) {
        setScanning(true);
        handleScanCreate();
      }
    },
  });

  const handleScanAvailable = useCallback(() => {
    ReceptionService.scanAvailable(
      {user_auth_uid: user.auth_uid},
      user.access_token,
    )
      .then(response => {
        setScannerOn(response.data.msg);
      })
      .catch(error => {
        console.error(JSON.stringify(error.response));
      });
  }, [user]);

  const handleScanCreate = useCallback(() => {
    ReceptionService.scanCreate(
      {user_auth_uid: user.auth_uid},
      user.access_token,
    )
      .then(response => {
        setScannerOn(false);
      })
      .catch(error => {
        console.log(error.response);
      });
  }, [user]);

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
        if (response.data.msg) {
          navigation.navigate('Challenge');
        }
      })
      .catch(error => {
        console.error(JSON.stringify(error.response));
      });
  }, [user, navigation]);

  useEffect(() => {
    handleScanAvailable();
    handlePaidGameFee();
  }, [handleScanAvailable, handlePaidGameFee]);

  if (!hasPermission) {
    requestPermission();
    return;
  }

  if (device == null) {
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
        {scannerOn ? (
          <React.Fragment>
            <View style={camera.container}>
              <Camera
                style={camera.holder}
                device={device}
                isActive={scannerOn}
                codeScanner={codeScanner}
                key={device.id}
              />
            </View>
            <View>
              <Text style={[text.h1, text.color.black, text.align.center]}>
                {scanning ? 'Verifying...' : 'Scan now'}
              </Text>
              <Text style={[text.title, text.color.black, text.align.center]}>
                To start playing your matches scan the qr code in the reception
              </Text>
            </View>
          </React.Fragment>
        ) : (
          <View>
            <Text style={[text.title, text.color.black, text.align.center]}>
              You can now pay to the counter
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const view = StyleSheet.create({
  safeArea: {
    height: '100%',
  },
  scroll: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

const camera = StyleSheet.create({
  container: {
    width: 256,
    height: 256,
    borderWidth: 10,
    borderColor: 'black',
    overflow: 'hidden',
  },
  holder: {
    position: 'fixed',
    left: '-100%',
    width: '300%',
    height: '100%',
    resizeMode: 'stretch',
  },
});

export default Validate;
