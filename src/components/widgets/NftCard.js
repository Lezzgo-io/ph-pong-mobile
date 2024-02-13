import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {text} from '../../styles/app';

function NftCard(props) {
  console.log(props);
  return (
    <View style={styles.card.container}>
      <Image style={styles.card.image} source={{uri: props.image}} />
      <View>
        <Text style={[text.normal, text.color.black]}>{props.name}</Text>
        <Text style={[text.label, text.color.black]}>
          {props.collection}-{props.block}
        </Text>
        <Text style={[text.label, text.color.black]}>Own: {props.amount}x</Text>
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
      height: 128,
      marginRight: 8,
    },
  },
});

export default NftCard;
