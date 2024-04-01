import React, {useCallback, useContext, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Global from '../../util/global';
import {button, container, text} from '../../styles/app';

import ArrowRight from '../../assets/arrows/arrow-chevron-right.png';
import JoinMatchCardBg from '../../assets/join-match-card-bg.png';

function Home({navigation}) {
  const {user} = useContext(Global);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={view.safeArea}>
      <ScrollView
        contentContainerStyle={view.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text style={[text.jumbo, text.color.black]}>
          Hi {user.first_name},
        </Text>
        <Text style={[text.normal, text.color.black]}>Welcome back!</Text>
        <View style={[card.container]}>
          <Image source={JoinMatchCardBg} style={[card.joinMatchCardBg]} />
          <Text style={[text.color.white, thisText.joinMatchLead]}>
            Ready to share some cheers?
          </Text>
          <TouchableOpacity style={[button.link, thisButton.cta]}>
            <Text
              style={[text.normal, text.color.white, thisText.joinMatchLabel]}>
              Join a match
            </Text>
            <Image source={ArrowRight} style={[thisButton.ctaArrow]} />
          </TouchableOpacity>
        </View>
        <View style={[container.title]}>
          <Text style={[text.title, text.color.black]}>My NFTs</Text>
          <TouchableOpacity style={[button.link]}>
            <Text style={[text.normal, text.color.blue]}>See all &gt;</Text>
          </TouchableOpacity>
        </View>
        <View style={[card.nftContainer]}>
          <View style={[card.nftCircle]}>
            <Text style={[text.label, text.color.black, card.nftCircleLabel]}>
              nft1
            </Text>
          </View>
          <View style={[card.nftCircle]}>
            <Text style={[text.label, text.color.black, card.nftCircleLabel]}>
              nft2
            </Text>
          </View>
          <View style={[card.nftCircle]}>
            <Text style={[text.label, text.color.black, card.nftCircleLabel]}>
              nft3
            </Text>
          </View>
          <View style={[card.nftCircle]}>
            <Text style={[text.label, text.color.black, card.nftCircleLabel]}>
              nft4
            </Text>
          </View>
        </View>
        <Text style={[text.title, text.color.black]}>Ongoing Matches</Text>
        <View style={[card.ongoingMatches]}>
          <Text>Match 1</Text>
        </View>
        <View style={[card.ongoingMatches]}>
          <Text>Match 2</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const view = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    paddingTop: 20,
    marginHorizontal: 20,
  },
});

const card = StyleSheet.create({
  joinMatchCardBg: {
    position: 'absolute',
    zIndex: -1,
    width: 580,
    height: 540,
    resizeMode: 'cover',
  },
  container: {
    width: '100%',
    height: 152,
    marginVertical: 16,
    padding: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  nftContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 128,
    borderRadius: 12,
    overflow: 'hidden',
  },
  nftCircle: {
    width: 72,
    height: 92,
    borderRadius: 12,
    backgroundColor: '#4ac2db',
  },
  nftCircleLabel: {
    position: 'absolute',
    width: '100%',
    bottom: -24,
    textAlign: 'center',
  },
  ongoingMatches: {
    width: '100%',
    height: 152,
    marginVertical: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#4ac2db',
    overflow: 'hidden',
  },
});

const thisText = StyleSheet.create({
  joinMatchLead: {
    width: 212,
    fontSize: 28,
    fontWeight: 'bold',
  },
  joinMatchLabel: {
    marginBottom: 2,
  },
});

const thisButton = StyleSheet.create({
  cta: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctaArrow: {
    marginLeft: 8,
  },
});

export default Home;
