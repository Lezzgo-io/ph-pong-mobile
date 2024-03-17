import React, {useCallback, useContext, useEffect, useState} from 'react';
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

import Global from '../../util/global';
import Validator from '../../util/validator';

import AuthService from '../../services/AuthService';
import FirebaseService from '../../services/FirebaseService';

function Register({navigation}) {
  const {setUser} = useContext(Global);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({});

  const initUserInfo = useCallback(() => {
    setUserInfo({
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      password: '',
      confirmPassword: '',
      type: 'customer',
    });
  }, []);

  const onChange = (value, name) => {
    setUserInfo({...userInfo, [name]: value});
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      initUserInfo();
      setRefreshing(false);
    }, 2000);
  }, [initUserInfo]);

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
        .then(async response => {
          let user = {
            auth_uid: response.user.uid,
            first_name: userInfo.firstName,
            last_name: userInfo.lastName,
            email: userInfo.email,
            mobile: userInfo.mobile,
            type: userInfo.type,
            access_token: response.user.stsTokenManager.accessToken,
            access_expire: response.user.stsTokenManager.expirationTime,
          };

          await FirebaseService.insert('users', user);

          setUser(user);
          navigation.navigate('Home');
        })
        .catch(error => {
          console.error(error.code);

          if (error.code.includes('email')) {
            Alert.alert('Error', error.code);
          } else if (error.code.includes('password')) {
            Alert.alert('Error', error.code);
          } else {
            Alert.alert('Error', 'Oops! Something went wrong');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2000);
  };

  useEffect(() => {
    initUserInfo();
  }, [initUserInfo]);

  return (
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
            Registration
          </Text>
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
            style={[button.contained, bgColor.blue, thisButton.register]}
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
            <Text style={[text.normal, text.color.black]}>
              <Text style={[text.color.grey]}>Already registered?</Text> Login
              here
            </Text>
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
  },
});

const thisText = StyleSheet.create({
  title: {
    marginBottom: 32,
  },
});

const thisButton = StyleSheet.create({
  register: {
    marginTop: 32,
  },
});

export default Register;
