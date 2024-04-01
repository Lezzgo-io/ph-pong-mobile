import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB6S6czUJlc9nLEPW6ksDPZF76Ua18jAL4',
  authDomain: 'philippine-pong.firebaseapp.com',
  projectId: 'philippine-pong',
  storageBucket: 'philippine-pong.appspot.com',
  messagingSenderId: '1055097006119',
  appId: '1:1055097006119:web:9ba7e0cfa6115305448602',
  measurementId: 'G-LVSB0X2Z1L',
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseDB = getFirestore(firebaseApp);
const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export {firebaseApp, firebaseDB, firebaseAuth};
