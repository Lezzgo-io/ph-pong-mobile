import React from 'react';
import {Text, View} from 'react-native';

import {text} from '../../styles/app';

function Menu() {
  return (
    <View>
      <Text style={[text.title, text.color.black]}>Menu</Text>
    </View>
  );
}

export default Menu;
