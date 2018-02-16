import * as firebase from 'firebase';
import 'firebase/firestore';
import {FirestoreUsers} from "./firestore.users";

class Firestore {
  static db: firebase.firestore.Firestore;
  static fdb: firebase.database.Database;
  static fb: firebase.app.App;

  static storage: firebase.storage.Storage;
  static storageRef: firebase.storage.Reference;

  constructor() {
    // Singleton pattern: init db if not initialized yet
    if( !Firestore.db )
      Firestore.init();
  }

  /**
   * Initialize firebase app. Meanwhile, invoke firestore method and
   * set db static variable.
   */
  private static init(): void {
    // Initialize Firebase
    let config = {
      apiKey: "AIzaSyD_piYZVRV41FTKFsG33JkROBGFaNysVR0",
      authDomain: "appriuso.firebaseapp.com",
      databaseURL: "https://appriuso.firebaseio.com",
      projectId: "appriuso",
      storageBucket: "appriuso.appspot.com",
      messagingSenderId: "1027648136525"
    };

    // Initialize firebase App
    Firestore.fb = firebase.initializeApp( config );

    // Initialize Cloud Firestore through Firebase
    Firestore.db = firebase.firestore();

    // Initialize Cloud Firebase
    Firestore.fdb = firebase.database();

    // Get a reference to the storage service, which is used to create references in your storage bucket
    Firestore.storage = firebase.storage();

    // Create a storage reference from our storage service
    Firestore.storageRef = Firestore.storage.ref();
  }

  public getConfiguredFirebase(): firebase.app.App {
    return Firestore.fb;
  }

  public getFirestoreDB(): firebase.firestore.Firestore {
    return Firestore.db;
  }

  public getFirebaseDB(): firebase.database.Database {
    return Firestore.fdb;
  }

  public getFirestoreStorage(): firebase.storage.Storage {
    return Firestore.storage;
  }

  public getFirestoreSorageRef(): firebase.storage.Reference {
    return Firestore.storageRef
  }

  public googleLogin() {
    // Create an instance of the Google provider object
    let provider = new firebase.auth.GoogleAuthProvider();


    // Sign-in in popup window
    firebase.auth().signInWithPopup( provider ).then(
      function( result ) {
        // Specify or switch Auth state persistence before or after sign-in.
        // In this case, specify session only persistence
        if( result ) console.log( result );

        firebase.auth().setPersistence(
          firebase.auth.Auth.Persistence.LOCAL
        );
      }).catch( function( error ) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
    });
  }

}

// Export original validator but rename it
export { Firestore };
