import * as firebase from 'firebase';
import 'firebase/firestore';
import {FirestoreUsers} from "./firestore.users";

class Firestore {
  static db: firebase.firestore.Firestore;
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
      apiKey: "AIzaSyDbSul24AYIRgTbJWMcHe8Z3bo8lU9RUzo",
      authDomain: "applicazioni-web-63d92.firebaseapp.com",
      databaseURL: "https://applicazioni-web-63d92.firebaseio.com",
      projectId: "applicazioni-web-63d92",
      storageBucket: "applicazioni-web-63d92.appspot.com",
      messagingSenderId: "1098101396959"
    };

    // Initialize firebase App
    Firestore.fb = firebase.initializeApp( config );

    // Initialize Cloud Firestore through Firebase
    Firestore.db = firebase.firestore();

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

  public getFirestoreStorage(): firebase.storage.Storage {
    return Firestore.storage;
  }

  public getFirestoreSorageRef(): firebase.storage.Reference {
    return Firestore.storageRef
  }
}

// Export original validator but rename it
export { Firestore };
