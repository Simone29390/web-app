
import { Firestore } from './firestore';
import * as firebase from "firebase";
import Query = firebase.database.Query;

class FirebaseQueryManager {
  private fs: Firestore;
  public db: firebase.database.Database;

  constructor() {
    this.fs = new Firestore();
    this.db = this.fs.getFirebaseDB();
  }

  /**
   * Get a collection object
   * @param {string} collection name of collection
   * @returns {firebase.firestore.CollectionReference}
   */
  public getReference( reference: string ): firebase.database.Reference {
    if ( !reference ) {
      return null;
    }

    return this.db.ref( reference );
  }

  /**
   * Add some data in a specified collection. Document is not required. If you don't specified doc parameter,
   * it get the first document found.
   * @param {string} collection
   * @param {string} [doc]
   * @param data
   * @returns {Promise<any>}
   */
  public addData( reference: string, child: string, data: any ): Promise<any> {
    if ( !reference || !data ) {
      return;
    }

    // Use self instead this in inner function
    let ref: firebase.database.Reference = this.db.ref( reference );

    // If document is not defined, generate it with uuid
    return new Promise(( resolve, reject ) => {
      if ( !child ) {
        // Add a new document with a generated id.
        ref
          .set( data )

          // Promise returned from set function
          .then(function (docRef) {
            resolve({success: true, docRef: docRef})
          })
          .catch(function (error) {
            reject({success: false, error: error});
          });
      } else {
        ref
          .child( child )
          .set( data )

          // Promise returned from set function
          .then(function (docRef) {
            resolve({success: true, docRef: docRef})
          })
          .catch(function (error) {
            reject({success: false, error: error});
          });
      }
    });
  }
}

// Export original validator but rename it
export { FirebaseQueryManager as FirebaseQM };

