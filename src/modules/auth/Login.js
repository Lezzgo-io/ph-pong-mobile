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

function Login({navigation}) {
  const [refreshing, setRefreshing] = useState(false);

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const loginUser = useCallback(() => {
    AuthService.login({
      email: userInfo.email,
      password: userInfo.password,
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
        <Text style={[text.title, text.color.black]}>Login</Text>
        <View style={[card.container]}>
          {/* First name */}
          <Text style={[text.label, text.color.black]}>Email</Text>
          <TextInput
            style={[text.input, text.color.black]}
            value={userInfo.email}
            onChangeText={value => setUserInfo({...userInfo, email: value})}
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
          {/* Login button */}
          <TouchableOpacity
            style={[button.contained, bgColor.red]}
            onPress={() => loginUser()}>
            <Text style={[text.h1, text.color.white]}>Login</Text>
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
