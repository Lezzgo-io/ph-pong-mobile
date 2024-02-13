import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {text} from '../../styles/app';

function MatchCard() {
  let win = Math.random() > 0.5 ? 1 : 0;

  return (
    <View style={win ? styles.card.win : styles.card.lose}>
      <Text style={[text.normal, text.color.white]}>
        Match #{Math.round(Math.random() * (99999 - 1000) + 1000)}
      </Text>
      <Text style={[text.title, text.color.white]}>{win ? 'WIN' : 'LOSE'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    win: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
      padding: 16,
      borderRadius: 15,
      backgroundColor: 'green',
    },
    lose: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
      padding: 16,
      borderRadius: 15,
      backgroundColor: 'red',
    },
  },
});

export default MatchCard;
