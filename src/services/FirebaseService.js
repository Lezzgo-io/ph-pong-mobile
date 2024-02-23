import moment from 'moment';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import {firebaseDB} from '../config/firebase.js';

class FirebaseService {
  /**
   * Select document(s) from firebase
   * @param {*} table
   * @param {*} queries
   * @returns
   */
  static async select(table, queries = []) {
    let results = [];

    let querySnapshot = await getDocs(
      query(collection(firebaseDB, table), ...queries),
    );

    querySnapshot.forEach(i => {
      let data = i.data();
      data.doc_uid = i.id;
      results.push(data);
    });

    return results;
  }

  /**
   * Get a document by uid
   * @param {*} table
   * @param {*} uid
   * @returns
   */
  static async get(table, uid) {
    let docRef = await getDoc(doc(firebaseDB, table, uid));
    return docRef.data();
  }

  /**
   * Insert document in firebase
   * @param {*} table
   * @param {*} data
   * @returns
   */
  static async insert(table, data) {
    data.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
    data.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

    return await addDoc(collection(firebaseDB, table), data);
  }

  /**
   * Update document in firebase
   * @param {*} table
   * @param {*} uid
   * @param {*} data
   * @returns
   */

  static async update(table, uid, data) {
    data.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

    return await updateDoc(doc(firebaseDB, table, uid), data);
  }
}

export default FirebaseService;
