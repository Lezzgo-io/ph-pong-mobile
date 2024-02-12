import React, {useCallback, useState} from 'react';
import {
  Alert,
  Button,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {button, text} from '../../styles/app';

function Profile() {
  const [refreshing, setRefreshing] = useState(false);

  const [walletAddress, setWalletAddress] = useState();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.view.safeArea}>
      <ScrollView
        contentContainerStyle={styles.view.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text style={[text.title, text.color.black]}>Profile</Text>
        <View style={styles.view.card.container}>
          <Text style={[text.normal, text.color.black]}>
            Welcome back, Tony!
          </Text>
        </View>
        <View style={styles.view.card.container}>
          <Text style={[text.label, text.color.black]}>Set your wallet</Text>
          <TextInput
            style={text.input}
            onChangeText={setWalletAddress}
            value={walletAddress}
          />
          <TouchableOpacity
            title="Update"
            style={button.contained}
            onPress={() => Alert.alert('Wallet is updated')}>
            <Text style={[text.normal, text.color.black]}>Set your wallet</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    safeArea: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scroll: {
      marginHorizontal: 20,
    },
    card: {
      container: {
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderRadius: 15,
      },
    },
  },
});

export default Profile;
