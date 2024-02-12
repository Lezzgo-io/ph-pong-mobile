import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {typography} from '../../styles/app';

function MatchCard() {
  return (
    <View style={styles.card}>
      <Text style={typography.text}>
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

export default MatchCard;
