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

import Validator from '../../util/Validator';
import Global from '../../util/Global';

import {bgColor, button, text} from '../../styles/app';

import AuthService from '../../services/AuthService';

function Login({navigation}) {
  // eslint-disable-next-line no-unused-vars
  const {auth, setAuth} = useContext(Global);
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
        .then(response => {
          console.log(JSON.stringify(response));
          setAuth(response.user);
          navigation.navigate('Home');
        })
        .catch(err => {
          console.error(err.code);
          setAuth(null);

          if (err.code.includes('email')) {
            Alert.alert('Error', err.code);
          } else if (err.code.includes('password')) {
            Alert.alert('Error', err.code);
          } else if (err.code.includes('credential')) {
            Alert.alert('Error', err.code);
          } else {
            Alert.alert('Error', 'Oops! Something went wrong');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2000);
  }, [userInfo, setAuth, navigation]);

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
