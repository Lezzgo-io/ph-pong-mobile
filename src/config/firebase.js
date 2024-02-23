import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAB5ScBB4mMwxovCh3KuqvUYIbxakLIiCU',
  authDomain: 'philippines-pong-1708089314605.firebaseapp.com',
  projectId: 'philippines-pong-1708089314605',
  storageBucket: 'philippines-pong-1708089314605.appspot.com',
  messagingSenderId: '751259420575',
  appId: '1:751259420575:web:077a051f52dff1101fdfaa',
  measurementId: 'G-5L4MFS843V',
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseDB = getFirestore(firebaseApp);
const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export {firebaseApp, firebaseDB, firebaseAuth};
