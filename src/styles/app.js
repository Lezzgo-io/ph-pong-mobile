import {StyleSheet} from 'react-native';

const text = StyleSheet.create({
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
  normal: {
    marginBottom: 8,
    fontFamily: 'outfit-latin-400-normal',
    fontSize: 18,
  },
  label: {
    marginBottom: 4,
    fontFamily: 'outfit-latin-400-normal',
    fontSize: 16,
  },
  input: {
    marginBottom: 8,
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  align: {
    left: {textAlign: 'left'},
    center: {textAlign: 'center'},
    right: {textAlign: 'right'},
  },
  color: {
    black: {color: 'black'},
    white: {color: 'white'},
    grey: {color: 'grey'},
  },
});

const button = StyleSheet.create({
  contained: {
    borderRadius: 8,
    borderWidth: 2,
  },
});

export {text, button};
