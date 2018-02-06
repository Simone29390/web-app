
import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import Query = firebase.database.Query;
import {FirebaseQM} from "../../firestore-cfg/firebaseQueryManager";
import {Firestore} from "../../firestore-cfg/firestore";
import * as _ from 'lodash';

@Component({
  selector: 'app-showcase-won',
  templateUrl: './showcase-won.component.html',
  styleUrls: ['./showcase-won.component.css']
})
export class ShowcaseWonComponent implements OnInit {
  private fs: Firestore;
  private filter: object;
  private qm: FirebaseQM;
  insertions = [];
  public completed: boolean;
  private fb: firebase.app.App;
  private user;

  constructor(  ) {
    this.fs = new Firestore();
    this.fb = this.fs.getConfiguredFirebase();
    this.qm = new FirebaseQM();

    this.completed = false;
  }

  ngOnInit() {
    let self = this;

    this.fb.auth().onAuthStateChanged( function( user ) {
      self.user = user;
      self.combineInsetions();
    });
  }


  public combineInsetions() {

    const self = this;

    // Init view
    self.insertions = [];
    this.completed = false;

    const ref = this.qm.getReference( 'Donation' );
    const groupRef = this.qm.getReference( 'Insertion' );

    let query: Query = ref
      .orderByChild( 'userkey')
      .equalTo( self.user['uid']);

    query.once('value').then(function (querySnapshot) {

      const obj: any = [];

      querySnapshot.forEach(function (snapshot) {

        let key = snapshot.child('key').val();
        groupRef
          .child(key)
          .once('value')
          .then(function ( snapshot1 ) {

            const state = snapshot1.child('state').val();
            const auctionHigherBidder  = snapshot1.child('auctionHigherBidder').val();

            if (state === 'expired' && auctionHigherBidder === self.user['uid']) {

              self.insertions.push({
                key           : snapshot1.child('key').val(),
                datetime      : snapshot1.child('datetime').val(),
                category      : snapshot1.child('category').val(),
                title         : snapshot1.child('title').val(),
                description   : snapshot1.child('description').val(),
                image         : snapshot1.child('images').child('image1').val(),
              });

              self.insertions = _.uniqBy(self.insertions, 'key');
            }
          });

      });

      self.completed = true;
    });

  }




}
