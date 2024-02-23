import {firebaseAuth} from '../config/firebase';
import {createUserWithEmailAndPassword, signOut} from 'firebase/auth';

import {signInWithEmailAndPassword} from 'firebase/auth/cordova';

class AuthService {
  static async register(payload) {
    return await createUserWithEmailAndPassword(
      firebaseAuth,
      payload.email,
      payload.password,
    );
  }
  static async login(payload) {
    return await signInWithEmailAndPassword(
      firebaseAuth,
      payload.email,
      payload.password,
    );
  }
  static async logout() {
    return await signOut(firebaseAuth);
  }
}

export default AuthService;
