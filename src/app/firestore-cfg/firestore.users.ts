import * as firebase from 'firebase';
import 'firebase/firestore';
import {Firestore} from "./firestore";
import {FirestoreQM} from "./firestoreQueryManager";
import {FileUpload} from "../utility/upload/fileupload";
import {UploadFileService} from "../utility/upload/fileupload.service";
import Query = firebase.firestore.Query;

class FirestoreUsers {
  private fs: Firestore;
  private fb: firebase.app.App;
  private db: firebase.firestore.Firestore;

  private queryManager: FirestoreQM;

  constructor() {
    // Initialize a Firestore
    this.fs = new Firestore();

    // Retrieve firebase configured object
    this.fb = this.fs.getConfiguredFirebase();

    // Retrieve Firestore DB
    this.db = this.fs.getFirestoreDB();

    // Creates the QueryManager object
    this.queryManager = new FirestoreQM();
  }

  /**
   * Create a new account by passing the new user's email address and password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<any>}
   */
  public createUser(email: string, password: string): Promise<any> {
    // Wrapper of this object
    let self = this;

    return new Promise((resolve, reject) => {
      this.fb.auth().createUserWithEmailAndPassword(email, password)
        .then(function (success) {

          // Add user in users collection
          self.queryManager.addData(
            'users',
            null,
            { email: email }
          ).then(function (res) {
            resolve({success: true});
          });
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

  public updateUser(userParams: any): void {
    if (!userParams) return;

    // Wrapper of this object
    let self = this;

    let user: firebase.User = this.getLoggedUser();

    if (userParams.photoURL) {
      this.uploadProfilePhoto(userParams.photoURL)
        .then(function (success) {
          userParams.photoURL = success;

          self.updateProfile(user, userParams)
        })
    } else {
      this.updateProfile(user, userParams)
    }
  }

  public getLoggedUser(): firebase.User {
    return this.fb.auth().currentUser;
  }

  public isLogged(): boolean {
    return Boolean(this.getLoggedUser());
  }

  private uploadProfilePhoto(file: File): Promise<string> {
    if (!file)
      return;

    let uploadFileService: UploadFileService = new UploadFileService(),
      progress: { percentage: number } = {percentage: 0},
      fileUploaded: { data: Array<FileUpload> } = {data: []};

    return new Promise((resolve, reject) => {
      uploadFileService.pushFileToStorage(
        new FileUpload(file),
        'profile_photo',
        progress,
        fileUploaded
      ).then(function (success) {
        resolve(success.file.url)
      });
    });
  }

  private updateProfile(user: firebase.User, userParams: any) {
    let u: firebase.User = user;

    userParams[ 'uid' ] = user.uid;

    u.updateProfile(
      userParams
    ).then(function () {

    });

    // Update successful.
    let queryManager: FirestoreQM = new FirestoreQM();

    let ref: Query = queryManager.getRefQuery(
      'users',
      new Array({
        filter: 'email',
        comparison: '==',
        value: u.email
      })
    );

    ref.get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          queryManager.addData('users', doc.id, userParams);
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }
}

// Export original validator but rename it
export {FirestoreUsers};
