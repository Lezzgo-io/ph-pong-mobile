import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {text} from '../../styles/app';

function JoinMatchCard() {
  let open = Math.random() > 0.5 ? 1 : 0;
  let vs = Math.round(Math.random() * (5 - 1) + 1);

  return (
    <View style={open ? styles.card.open : styles.card.close}>
      <Text style={[text.normal, text.color.white]}>
        {vs} vs {vs}
      </Text>
      <Text style={[text.title, text.color.white]}>
        {open ? 'JOIN' : 'FULL'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    open: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
      padding: 16,
      borderRadius: 15,
      backgroundColor: 'green',
    },
    close: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
      padding: 16,
      borderRadius: 15,
      backgroundColor: 'grey',
    },
  },
});

export default JoinMatchCard;
