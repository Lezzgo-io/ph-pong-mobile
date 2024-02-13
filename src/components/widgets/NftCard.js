import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {text} from '../../styles/app';

import Nfts from '../../assets/my-nfts.png';

function NftCard() {
  return (
    <View style={styles.card.container}>
      <Image style={styles.card.image} source={Nfts} />
      <View>
        <Text style={[text.normal, text.color.black]}>
          PHPONG PASS #{Math.round(Math.random() * (99999 - 1000) + 1000)}
        </Text>
        <Text style={[text.label, text.color.black]}>
          _0x{Math.round(Math.random() * (99999999 - 1000) + 1000)}
        </Text>
        <Text style={[text.label, text.color.black]}>
          Own: {Math.round(Math.random() * (100 - 10) + 10)}x
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    container: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 8,
      padding: 16,
      backgroundColor: 'white',
      borderRadius: 15,
      borderWidth: 1,
    },
    image: {
      width: 64,
      marginRight: 8,
    },
  },
});

export default NftCard;
