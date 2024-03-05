import React, {useCallback, useContext, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
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
    <SafeAreaView style={view.safeArea}>
      <ScrollView
        contentContainerStyle={view.scroll}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text style={[text.title, text.color.black]}>Login</Text>
        <View style={[card.container]}>
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
          {/* Login button */}
          <TouchableOpacity
            style={[button.contained, bgColor.red]}
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
            <Text style={[text.h1, text.color.black]}>Register instead</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const view = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  scroll: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 64,
    paddingBottom: 64,
  },
});

const card = StyleSheet.create({
  container: {
    width: '80%',
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default Login;
