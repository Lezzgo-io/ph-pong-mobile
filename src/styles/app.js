import {StyleSheet} from 'react-native';

const typography = StyleSheet.create({
  title: {
    marginBottom: 8,
    fontFamily: 'outfit-latin-700-normal',
    fontSize: 22,
  },
  h1: {
    marginBottom: 8,
    fontFamily: 'outfit-latin-700-normal',
    fontSize: 18,
  },
  text: {
    marginBottom: 8,
    fontFamily: 'outfit-latin-400-normal',
    fontSize: 18,
  },
  align: {
    left: {textAlign: 'left'},
    center: {textAlign: 'center'},
    right: {textAlign: 'right'},
  },
  color: {
    black: {color: 'black'},
    white: {color: 'white'},
  },
});

export {typography};
