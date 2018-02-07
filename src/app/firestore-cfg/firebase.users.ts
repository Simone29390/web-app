import * as firebase from 'firebase';
import 'firebase/firestore';
import {Firestore} from "./firestore";
import {FirebaseQM} from "./firebaseQueryManager";
import Query = firebase.database.Query;

class FirebaseUsers {
  private fs: Firestore;
  private fb: firebase.app.App;
  private db: firebase.firestore.Firestore;

  private queryManager: FirebaseQM;

  constructor() {
    this.fs = new Firestore();
    this.fb = this.fs.getConfiguredFirebase();
    this.db = this.fs.getFirestoreDB();
    this.queryManager = new FirebaseQM();
  }

  /**
   * Create a new account by passing the new user's email address and password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<any>}
   */
  public createUser(email: string, password: string): Promise<any> {

    return new Promise((resolve, reject) => {
      this.fb.auth().createUserWithEmailAndPassword(email, password)
        .then(function (success) {
          resolve({success: true});
        })
        .catch(function (error) {
          reject({
            success: false,
            errorCode: error.code,
            errorMessage: error.message
          });
        });
    });
  }

  public updateUser(userParams: any): Promise<any> {
    if (!userParams) return;

    return new Promise((resolve, reject) => {

      let user: firebase.User = this.getLoggedUser();

      userParams[ 'userkey' ] = user.uid;

      let queryManager: FirebaseQM = new FirebaseQM();

      const ref = queryManager.getReference( 'User' );

      const query: Query = ref.child( user.uid );

      query.once('value').then(function (querySnapshot) {

        if (querySnapshot.exists()) {
          ref.child( user.uid ).update(
            userParams
          ).then((snap) => {
            resolve({success: true});
          }).catch(function (error) {
            reject({
              success: false,
              errorCode: error.code,
              errorMessage: error.message
            });
          });

        } else  {
          ref.child( user.uid ).set(
            userParams
          ).then((snap) => {
            resolve({success: true});
          }).catch(function (error) {
            reject({
              success: false,
              errorCode: error.code,
              errorMessage: error.message
            });
          });
        }
      });
    });
  }

  public getLoggedUser(): firebase.User {
    return this.fb.auth().currentUser;
  }
}

// Export original validator but rename it
export {FirebaseUsers};
