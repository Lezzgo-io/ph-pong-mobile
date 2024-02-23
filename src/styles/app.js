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
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: 'black',
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
    grey: {color: 'grey'},
  },
});

const button = StyleSheet.create({
  contained: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 6,
    borderRadius: 8,
  },
  link: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },
  activity: {
    position: 'absolute',
    margin: 'auto',
  },
});

const fontColor = StyleSheet.create({
  red: {backgroundColor: '#c10b22'},
  blue: {backgroundColor: '#1a439f'},
});

const bgColor = StyleSheet.create({
  red: {backgroundColor: '#c10b22'},
  blue: {backgroundColor: '#1a439f'},
  green: {backgroundColor: 'green'},
  grey: {backgroundColor: 'grey'},
});

export {text, button, fontColor, bgColor};
