import React, {useCallback, useState} from 'react';
import {
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
import AuthService from '../../services/AuthService';

function Register({navigation}) {
  const [refreshing, setRefreshing] = useState(false);

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 'customer',
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const registerUser = useCallback(() => {
    AuthService.register({
      first_name: userInfo.firstName,
      last_name: userInfo.lastName,
      username: userInfo.username,
      email: userInfo.email,
      password: userInfo.password,
      type: userInfo.type,
    })
      .then(response => {
        navigation.navigate('Home');
      })
      .catch(error => {
        console.error(JSON.stringify(error.response));

        if (error.response.status === 500) {
          Alert.alert('Error', 'Oops something went wrong!');
        } else if (error.response.status === 422) {
          Alert.alert('Error', 'Incomplete details');
        }
      })
      .finally(() => {});
  }, [userInfo, navigation]);

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
            onChangeText={value => setUserInfo({...userInfo, firstName: value})}
            autoCapitalize="words"
          />
          {/* Last name */}
          <Text style={[text.label, text.color.black]}>Last name</Text>
          <TextInput
            style={[text.input, text.color.black]}
            value={userInfo.lastName}
            onChangeText={value => setUserInfo({...userInfo, lastName: value})}
            autoCapitalize="words"
          />
          {/* Email address */}
          <Text style={[text.label, text.color.black]}>Email address</Text>
          <TextInput
            style={[text.input, text.color.black]}
            value={userInfo.email}
            onChangeText={value => setUserInfo({...userInfo, email: value})}
            autoCapitalize="none"
          />
          {/* Username */}
          <Text style={[text.label, text.color.black]}>Username</Text>
          <TextInput
            style={[text.input, text.color.black]}
            value={userInfo.username}
            onChangeText={value => setUserInfo({...userInfo, username: value})}
            autoCapitalize="none"
          />
          {/* Password */}
          <Text style={[text.label, text.color.black]}>Password</Text>
          <TextInput
            style={[text.input, text.color.black]}
            value={userInfo.password}
            onChangeText={value => setUserInfo({...userInfo, password: value})}
            autoCapitalize="none"
          />
          {/* Confirm password */}
          <Text style={[text.label, text.color.black]}>Confirm password</Text>
          <TextInput
            style={[text.input, text.color.black]}
            value={userInfo.confirmPassword}
            onChangeText={value =>
              setUserInfo({...userInfo, confirmPassword: value})
            }
            autoCapitalize="none"
          />
          {/* Register button */}
          <TouchableOpacity
            style={[button.contained, bgColor.red]}
            onPress={() => registerUser()}>
            <Text style={[text.h1, text.color.white]}>Register</Text>
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
