import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {bgColor, button, text} from '../../styles/app';

function MatchCard({data}) {
  return (
    <View style={[bgColor.grey, card.container]}>
      <Text style={[text.title, text.color.white]}>{data.type}</Text>
      <TouchableOpacity style={[button.contained, bgColor.blue]}>
        <Text style={[text.title, text.color.white]}>JOIN</Text>
      </TouchableOpacity>
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
  },
});

export default MatchCard;
