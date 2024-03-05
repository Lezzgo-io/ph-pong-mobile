import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {bgColor, chip, text} from '../../styles/app';

function JoinMatchCard({data}) {
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
      <View>
        <Text style={[text.jumbo, text.color.black, text.align.center]}>
          {data.type}
        </Text>
        <View
          style={[
            chip.contained,
            data.status === 'open' ? bgColor.green : bgColor.grey,
          ]}>
          <Text style={[text.title, text.color.white]}>
            {data.status === 'open'
              ? 'JOIN'
              : data.status === 'in-game'
              ? 'IN-GAME'
              : 'FULL/CLOSED'}
          </Text>
        </View>
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

export default JoinMatchCard;
