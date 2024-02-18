import React, {useCallback, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {text} from '../../styles/app';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import UserService from '../../services/UserService';

function Validate({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      checkValidation();
      setRefreshing(false);
    }, 2000);
  }, [checkValidation]);

  const checkValidation = useCallback(() => {
    UserService.getValidation({}, '')
      .then(response => {
        console.log(response.data);
        if (response.data.validated) {
          navigation.navigate('Challenge');
        }
      })
      .catch(error => {
        console.error(JSON.stringify(error));
      })
      .finally(() => {});
  }, [navigation]);

  const validate = useCallback(() => {
    UserService.validate({}, '')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(JSON.stringify(error));
      })
      .finally(() => {});
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],

    onCodeScanned: codes => {
      if (!analyzing) {
        setAnalyzing(true);
        validate();

        let message = codes.map((i, iKey) => i.value);
        console.log(message);

        setTimeout(() => {
          setAnalyzing(false);
        }, 5000);
      }
    },
  });

  if (!hasPermission) {
    requestPermission();
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
            {analyzing ? 'Scanning...' : 'Scan now'}
          </Text>
          <Text style={[text.title, text.color.black, text.align.center]}>
            To start playing your matches scan the qr code in the reception
          </Text>
        </View>
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
