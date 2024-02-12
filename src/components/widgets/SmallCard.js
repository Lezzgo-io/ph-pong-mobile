import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {text} from '../../styles/app';

function SmallCard() {
  return (
    <View style={styles.card}>
      <Text style={[text.normal, text.color.black]}>
        Match #{Math.round(Math.random() * (99999 - 1000) + 1000)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
    padding: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});

export default SmallCard;
