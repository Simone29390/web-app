import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import Query = database.Query;
import {FirebaseQM} from "../../firestore-cfg/firebaseQueryManager";
import {Firestore} from "../../firestore-cfg/firestore";
import {database} from "firebase";


@Injectable()
export class HistoryDonationService {
  private fs: Firestore;
  private qm: FirebaseQM;
  donations;
  private fb: firebase.app.App;
  user;
  resultsLength = 0;

  constructor( ) {
    this.fs = new Firestore();
    this.fb = this.fs.getConfiguredFirebase();
    this.qm = new FirebaseQM();

    let self = this;


  }

  public getDonations(user: object): Promise<any> {

    let self = this;
    this.qm = new FirebaseQM();
    const ref = this.qm.getReference( 'Donation' );

    self.donations = [];

    let query: Query = ref
      .orderByChild( 'userkey')
      .equalTo( user['uid']);

    return new Promise(( resolve, reject ) => {

      query.once('value').then(function (querySnapshot) {

        const obj: any = [];

        querySnapshot.forEach(function (snapshot) {

          self.donations.push({
            datetime           : snapshot.child('datetime').val(),
            value              : snapshot.child('value').val(),
            key                : snapshot.child('key').val(),
          });

        });
        resolve({success: true, docRef: self.donations})

      }).catch(function (error) {
        reject({success: false, error: error});
      });

    })
  }
}
