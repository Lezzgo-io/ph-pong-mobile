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

import {bgColor, button, text} from '../../styles/app';

import Global from '../../util/Global';
import Validator from '../../util/Validator';

import AuthService from '../../services/AuthService';
import FirebaseService from '../../services/FirebaseService';

function Register({navigation}) {
  // eslint-disable-next-line no-unused-vars
  const {auth, setAuth} = useContext(Global);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 'customer',
  });

  const clearUserInfo = useCallback(() => {
    setUserInfo(userInfo);
  }, [userInfo]);

  const onChange = (value, name) => {
    setUserInfo({...userInfo, [name]: value});
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      clearUserInfo();
      setRefreshing(false);
    }, 2000);
  }, [clearUserInfo]);

  const handleRegister = () => {
    let validation = Validator.check([
      Validator.required(userInfo, 'firstName'),
      Validator.required(userInfo, 'lastName'),
      Validator.required(userInfo, 'mobile'),
      Validator.required(userInfo, 'email'),
      Validator.required(userInfo, 'password'),
      Validator.required(userInfo, 'type'),
    ]);

    if (!validation.pass) {
      Alert.alert('Error', JSON.stringify(validation.result));
      return;
    }

    setLoading(true);

    setTimeout(() => {
      AuthService.register({email: userInfo.email, password: userInfo.password})
        .then(response => {
          console.log(JSON.stringify(response));

          FirebaseService.insert('users', {
            auth_uid: response.user.uid,
            first_name: userInfo.firstName,
            last_name: userInfo.lastName,
            email: userInfo.email,
            mobile: userInfo.mobile,
            type: userInfo.type,
            access_token: response.user.stsTokenManager.accessToken,
            access_expire: response.user.stsTokenManager.expirationTime,
          })
            .then(res => {
              console.log(JSON.stringify(res));
              setAuth(response.user);
              navigation.navigate('Home');
            })
            .catch(err => {
              console.log(JSON.stringify(err));
            });
        })
        .catch(err => {
          console.log(err.code);

          if (err.code.includes('email')) {
            Alert.alert('Error', err.code);
          } else if (err.code.includes('password')) {
            Alert.alert('Error', err.code);
          } else {
            Alert.alert('Error', 'Oops! Something went wrong');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2000);
  };

  return (
    <SafeAreaView style={view.safeArea}>
      <ScrollView
        contentContainerStyle={view.scroll}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text style={[text.title, text.color.black]}>Registration</Text>
        <View style={[card.container]}>
          {/* First name */}
          <Text style={[text.label, text.color.black]}>First name</Text>
          <TextInput
            style={[text.input, text.color.black]}
            value={userInfo.firstName}
            onChangeText={value => onChange(value, 'firstName')}
            autoCapitalize="words"
          />
          {/* Last name */}
          <Text style={[text.label, text.color.black]}>Last name</Text>
          <TextInput
            style={[text.input, text.color.black]}
            value={userInfo.lastName}
            onChangeText={value => onChange(value, 'lastName')}
            autoCapitalize="words"
          />
          {/* Email address */}
          <Text style={[text.label, text.color.black]}>Email address</Text>
          <TextInput
            style={[text.input, text.color.black]}
            value={userInfo.email}
            onChangeText={value => onChange(value, 'email')}
            autoCapitalize="none"
          />
          {/* Username */}
          <Text style={[text.label, text.color.black]}>Mobile</Text>
          <TextInput
            style={[text.input, text.color.black]}
            value={userInfo.mobile}
            onChangeText={value => onChange(value, 'mobile')}
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
          {/* Confirm password */}
          <Text style={[text.label, text.color.black]}>Confirm password</Text>
          <TextInput
            style={[text.input, text.color.black]}
            value={userInfo.confirmPassword}
            onChangeText={value => onChange(value, 'confirmPassword')}
            autoCapitalize="none"
          />
          {/* Register button */}
          <TouchableOpacity
            style={[button.contained, bgColor.red]}
            onPress={() => handleRegister()}
            disabled={loading}>
            <Text style={[text.h1, text.color.white]}>Register</Text>
            {loading && (
              <ActivityIndicator
                style={[button.activity]}
                size="large"
                color="#0000ff"
              />
            )}
          </TouchableOpacity>
          {/* Login button */}
          <TouchableOpacity
            style={[button.link, text.color.black]}
            onPress={() => navigation.navigate('Login')}>
            <Text style={[text.h1, text.color.black]}>Login instead</Text>
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

export default Register;
