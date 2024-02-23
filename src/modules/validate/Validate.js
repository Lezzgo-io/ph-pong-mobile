import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {text} from '../../styles/app';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import ReceptionService from '../../services/ReceptionService';
import AuthService from '../../services/AuthService';

function Validate({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scannerOn, setScannerOn] = useState(false);

  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      handleScanAvailable();
      setRefreshing(false);
    }, 2000);
  }, [handleScanAvailable]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],

    onCodeScanned: codes => {
      let message = codes.map((i, iKey) => i.value);

      if (
        !scanning &&
        message.includes('https://lezzgo.io/collection/philippine-pong')
      ) {
        setScanning(true);
      }
    },
  });

  const handleScanAvailable = useCallback(() => {
    ReceptionService.scanAvailable()
      .then(response => {
        setScannerOn(response.data.available);
      })
      .catch(err => console.log(err.response));

    AuthService.user().then(response => {
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    handleScanAvailable();
  }, [handleScanAvailable]);

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
        {scannerOn && (
          <React.Fragment>
            <View style={camera.container}>
              <Camera
                style={camera.holder}
                device={device}
                isActive={true}
                codeScanner={codeScanner}
              />
            </View>
            <View>
              <Text style={[text.h1, text.color.black, text.align.center]}>
                {scanning ? 'Scanning...' : 'Scan now'}
              </Text>
              <Text style={[text.title, text.color.black, text.align.center]}>
                To start playing your matches scan the qr code in the reception
              </Text>
            </View>
          </React.Fragment>
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
