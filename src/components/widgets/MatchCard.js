import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {bgColor, chip, text} from '../../styles/app';

function MatchCard({data}) {
  return (
    <View style={[bgColor.white, card.container]}>
      <View>
        <Text style={[text.title, text.color.black]}>
          {data.creator_first_name} {data.creator_last_name}
        </Text>
        <Text style={[text.label, text.color.black]}>{data.creator_email}</Text>
        <Text style={[text.label, text.color.black]}>
          {data.creator_mobile}
        </Text>
      </View>
      <Text style={[text.title, text.color.black]}>{data.type}</Text>
      <View style={[chip.contained, data.paid ? bgColor.green : bgColor.red]}>
        <Text style={[text.title, text.color.white]}>
          {data.paid ? 'PAID' : 'PAY NOW'}
        </Text>
      </View>
    </View>
  );
}

const card = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 16,
    borderRadius: 15,
    borderWidth: 1,
  },
});

export default MatchCard;
