import { Component, OnInit } from '@angular/core';
import {DataSource} from "@angular/cdk/typings/collections";
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase";
import Query = firebase.database.Query;
import {FirebaseQM} from "../../firestore-cfg/firebaseQueryManager";
import {Firestore} from "../../firestore-cfg/firestore";
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-history-donations',
  templateUrl: './history-donations.component.html',
  styleUrls: ['./history-donations.component.css']
})
export class HistoryDonationsComponent implements OnInit {
  private fs: Firestore;
  private filter: object;
  private qm: FirebaseQM;
  donations = [];
  public completed: boolean;
  private fb: firebase.app.App;
  private user;
  displayedColumns = ['datetime', 'value', 'key'];
  dataSource;

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
    self.donations = [];
    this.completed = false;

    const ref = this.qm.getReference( 'Donation' );
    const groupRef = this.qm.getReference( 'Insertion' );

    let query: Query = ref
      .orderByChild( 'userkey')
      .equalTo( self.user['uid']);

    query.once('value').then(function (querySnapshot) {

      const obj: any = [];

      querySnapshot.forEach(function (snapshot) {

        self.donations.push({
          datetime           : snapshot.child('datetime').val(),
          value              : snapshot.child('value').val(),
          key                : snapshot.child('key').val(),
        });
        console.log(self.donations)
      });

      self.dataSource = new MatTableDataSource(self.donations);

      self.completed = true;
    });

  }


}


