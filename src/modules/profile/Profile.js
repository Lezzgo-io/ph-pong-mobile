import React, {useCallback, useContext, useState} from 'react';
import {
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

import Global from '../../util/global';
import {bgColor, button, text} from '../../styles/app';

import Placeholder from '../../assets/placeholder.jpeg';
import ProfileImageBg from '../../assets/profile-image-bg.png';

function Profile() {
  const {user} = useContext(Global);

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
        <View style={[design.bannerContainer]}>
          <Image style={[design.bannerImage]} source={ProfileImageBg} />
        </View>
        <View style={styles.view.card.container}>
          <Image style={styles.profileImage} source={Placeholder} />
          <Text style={[text.label, text.color.grey]}>Name</Text>
          <Text style={[text.normal, text.color.black]}>
            {user?.first_name} {user?.last_name}
          </Text>
          <Text style={[text.label, text.color.grey]}>Username</Text>
          <Text style={[text.normal, text.color.black]}>
            @{user?.first_name?.toLowerCase()}-{user?.last_name?.toLowerCase()}
          </Text>
          <Text style={[text.label, text.color.grey]}>Email address</Text>
          <Text style={[text.normal, text.color.black]}>{user?.email}</Text>
          <Text style={[text.label, text.color.grey]}>Mobile</Text>
          <Text style={[text.normal, text.color.black]}>{user?.mobile}</Text>
        </View>
        <View style={styles.view.card.container}>
          <Text style={[text.label, text.color.grey, text.color.black]}>
            Set your wallet
          </Text>
          <TextInput
            style={text.input}
            onChangeText={setWalletAddress}
            value={walletAddress}
          />
          <TouchableOpacity
            title="Update"
            style={[button.contained, bgColor.red]}
            onPress={() => Alert.alert('Wallet is updated')}>
            <Text style={[text.normal, text.color.black, text.align.center]}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const design = {
  bannerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 172,
    overflow: 'hidden',
  },
  bannerImage: {
    zIndex: 1,
    width: '100%',
    height: 172,
    resizeMode: 'cover',
  },
};

const styles = StyleSheet.create({
  view: {
    safeArea: {
      flex: 1,
    },
    scroll: {
      marginHorizontal: 0,
    },
    card: {
      container: {
        marginTop: 90,
        marginBottom: 16,
        padding: 16,
      },
    },
  },
  profileImage: {
    marginBottom: 16,
    borderRadius: 100,
    width: 128,
    height: 128,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});

export default Profile;
