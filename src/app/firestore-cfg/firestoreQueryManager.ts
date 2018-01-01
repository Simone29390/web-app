
import { Firestore } from './firestore';
import * as firebase from "firebase";
import Query = firebase.firestore.Query;

class FirestoreQueryManager {
  private fs: Firestore;
  private db: firebase.firestore.Firestore;

  constructor() {
    this.fs = new Firestore();
    this.db = this.fs.getFirestoreDB();
  }

  /**
   * Get a collection object
   * @param {string} collection name of collection
   * @returns {firebase.firestore.CollectionReference}
   */
  private getCollection( collection: string ): firebase.firestore.CollectionReference {
    if( !collection ) return null;

    return this.db.collection( collection );
  }


  /**
   * Retrieve the reference of query
   * @param {string} collection
   * @param {Array<any>} queryConditions
   * @returns {Query}
   */
  public getRefQuery( collection: string, queryConditions: Array< any > ): Query {
    if( !collection || !queryConditions ) return null;

    // Create a reference to the collection
    let ref = this.getCollection( collection );

    if( !ref ) return null;

    // Create a query against the collection. Iterate and assign result for
    // complex query.
    // ie: ref.where("state", ">=", "CA")
    //        .where("state", "<=", "IN")

    // Remove from array the first item
    let params = queryConditions.shift();

    // Performs the query
    let query: Query = ref.where(
      params.filter,
      params.comparison,
      params.value
    );

    // Iterate over remaining params
    for ( let queryParams of queryConditions ) {
      query = query.where(
        queryParams.filter,
        queryParams.comparison,
        queryParams.value
      );
    }

    return query;
  }

  /**
   * Add some data in a specified collection. Document is not required. If you don't specified doc parameter,
   * it get the first document found.
   * @param {string} collection
   * @param {string} [doc]
   * @param data
   * @returns {Promise<any>}
   */
  public addData( collection: string, doc: string, data: any ): Promise<any> {
    if( !collection || !data ) return;

    // Use self instead this in inner function
    let ref: firebase.firestore.CollectionReference = this.db.collection( collection );

    // If document is not defined, generate it with uuid
    return new Promise(( resolve, reject ) => {
      if ( !doc ) {
        // Add a new document with a generated id.
        ref
          .doc()
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
          .doc( doc )
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
export { FirestoreQueryManager as FirestoreQM };
