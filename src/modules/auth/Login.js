import React, {useCallback, useContext, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {where} from 'firebase/firestore';

import Validator from '../../util/validator';
import Global from '../../util/global';

import {bgColor, button, text} from '../../styles/app';

import AuthService from '../../services/AuthService';
import FirebaseService from '../../services/FirebaseService';

import LoginBg00 from '../../assets/login-bg-00.png';
import LoginBg01 from '../../assets/login-bg-01.png';

function Login({navigation}) {
  const {setUser} = useContext(Global);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({email: '', password: ''});

  const clearUserInfo = useCallback(() => {
    setUserInfo({email: '', password: ''});
  }, []);

  const onChange = (value, name) => {
    setUserInfo({...userInfo, [name]: value});
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      clearUserInfo();
      setRefreshing(false);
    }, 1000);
  }, [clearUserInfo]);

  const handleLogin = useCallback(() => {
    let validation = Validator.check([
      Validator.required(userInfo, 'email'),
      Validator.required(userInfo, 'password'),
    ]);

    if (!validation.pass) {
      Alert.alert('Error', JSON.stringify(validation.result));
      return;
    }

    setLoading(true);

    setTimeout(() => {
      AuthService.login({
        email: userInfo.email,
        password: userInfo.password,
      })
        .then(async response => {
          let user = await FirebaseService.select('users', [
            where('auth_uid', '==', response.user.uid),
          ]);

          await FirebaseService.update('users', user[0].doc_uid, {
            access_expire: response.user.stsTokenManager.expirationTime,
            access_token: response.user.stsTokenManager.accessToken,
          });

          user[0].access_token = response.user.stsTokenManager.accessToken;

          setUser(user[0]);
          navigation.navigate('Home');
        })
        .catch(error => {
          console.error(error.code);
          setUser(null);

          if (error.code.includes('email')) {
            Alert.alert('Error', error.code);
          } else if (error.code.includes('password')) {
            Alert.alert('Error', error.code);
          } else if (error.code.includes('credential')) {
            Alert.alert('Error', error.code);
          } else {
            Alert.alert('Error', 'Oops! Something went wrong');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2000);
  }, [userInfo, setUser, navigation]);

  return (
    <React.Fragment>
      <View style={[design.imageBanner]}>
        <Image source={LoginBg00} style={design.imageBanner.image00} />
        <Image source={LoginBg01} style={design.imageBanner.image01} />
      </View>
      <SafeAreaView style={view.safeArea}>
        <ScrollView
          contentContainerStyle={view.scroll}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={[card.container]}>
            <Text
              style={[
                text.jumbo,
                text.color.black,
                text.fullWidth,
                thisText.title,
              ]}>
              Login
            </Text>
            {/* Email name */}
            <Text style={[text.label, text.color.black]}>Email</Text>
            <TextInput
              style={[text.input, text.color.black]}
              value={userInfo.email}
              onChangeText={value => onChange(value, 'email')}
              autoCapitalize="none"
            />
            {/* Password */}
            <Text style={[text.label, text.color.black]}>Password</Text>
            <TextInput
              style={[text.input, text.color.black]}
              value={userInfo.password}
              onChangeText={value => onChange(value, 'password')}
              autoCapitalize="none"
            />
            {/* Forgot password */}
            <TouchableOpacity
              style={[button.link, text.color.black, thisButton.forgot]}
              onPress={() => navigation.navigate('Register')}>
              <Text style={[text.normal, text.color.grey]}>
                Forgot password?
              </Text>
            </TouchableOpacity>
            {/* Login button */}
            <TouchableOpacity
              style={[button.contained, bgColor.blue]}
              onPress={() => handleLogin()}
              disabled={loading}>
              <Text style={[text.h1, text.color.white]}>Login</Text>
              {loading && (
                <ActivityIndicator
                  style={[button.activity]}
                  size="large"
                  color="#0000ff"
                />
              )}
            </TouchableOpacity>
            {/* Register button */}
            <TouchableOpacity
              style={[button.link, text.color.black]}
              onPress={() => navigation.navigate('Register')}>
              <Text style={[text.normal, text.color.black]}>
                <Text style={[text.color.grey]}>No account yet?</Text> Register
                here
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={[design.bottomCircle]} />
    </React.Fragment>
  );
}

const view = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  scroll: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 64,
  },
});

const card = StyleSheet.create({
  container: {
    width: '80%',
  },
});

const design = StyleSheet.create({
  imageBanner: {
    position: 'relative',
    height: 182,
    image00: {
      position: 'absolute',
      top: -4,
    },
    image01: {
      position: 'absolute',
      right: 0,
    },
  },
  bottomCircle: {
    position: 'fixed',
    bottom: 128,
    left: -128,
    zIndex: -1,
    width: 512,
    height: 512,
    borderRadius: 256,
    backgroundColor: 'rgba(195, 18, 41, 0.26)',
  },
});

const thisText = StyleSheet.create({
  title: {
    marginBottom: 32,
  },
});

const thisButton = StyleSheet.create({
  forgot: {
    marginTop: 8,
  },
});

export default Login;
