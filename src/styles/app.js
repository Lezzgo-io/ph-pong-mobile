import {StyleSheet} from 'react-native';

export const container = StyleSheet.create({
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export const text = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  jumbo: {
    marginBottom: 8,
    fontFamily: 'plus-jakarta-sans-latin-600-normal',
    fontSize: 32,
  },
  title: {
    marginBottom: 8,
    fontFamily: 'plus-jakarta-sans-latin-800-normal',
    fontSize: 22,
  },
  h1: {
    marginBottom: 8,
    fontFamily: 'plus-jakarta-sans-latin-700-normal',
    fontSize: 18,
  },
  normal: {
    marginBottom: 8,
    fontFamily: 'plus-jakarta-sans-latin-400-normal',
    fontSize: 18,
  },
  label: {
    marginBottom: 4,
    fontFamily: 'plus-jakarta-sans-latin-400-normal',
    fontSize: 16,
  },
  input: {
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 8,
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
    blue: {color: '#173992'},
    red: {color: '#c10b22'},
  },
});

export const button = StyleSheet.create({
  contained: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 6,
    paddingHorizontal: 16,
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

export const chip = StyleSheet.create({
  contained: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
});

export const fontColor = StyleSheet.create({
  red: {backgroundColor: '#c10b22'},
  blue: {backgroundColor: '#173992'},
});

export const bgColor = StyleSheet.create({
  red: {backgroundColor: '#c10b22'},
  blue: {backgroundColor: '#173992'},
  green: {backgroundColor: 'green'},
  grey: {backgroundColor: 'grey'},
});
