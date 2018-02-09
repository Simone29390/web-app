import {Observable} from "rxjs/Observable";
import {DataSource} from '@angular/cdk/collections';

export interface Data {
  datetime: string;
  value: string;
  title: string;
  key: string;
}

import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import * as firebase from "firebase";
import Query = database.Query;
import {FirebaseQM} from "../../firestore-cfg/firebaseQueryManager";
import {Firestore} from "../../firestore-cfg/firestore";
import {database} from "firebase";
import {HistoryDonationService} from "./history-donation.service";
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {startWith} from "rxjs/operators";

@Component({
  selector: 'app-history-donations',
  templateUrl: './history-donations.component.html',
  styleUrls: ['./history-donations.component.css']
})
export class HistoryDonationsComponent implements OnInit, AfterViewInit {
  private fs: Firestore;
  private qm: FirebaseQM;
  donations;
  public completed: boolean;
  private fb: firebase.app.App;
  private user;
  displayedColumns = ['datetime', 'value', 'title', 'key'];
  dataSource = new MatTableDataSource();
  myData: Array < any > ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  resultsLength = 0;

  constructor( public historyDonationService: HistoryDonationService ) {
    this.fs = new Firestore();
    this.fb = this.fs.getConfiguredFirebase();
    this.qm = new FirebaseQM();

    this.completed = false;

  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    let self = this;

    this.fb.auth().onAuthStateChanged( function( user ) {
      self.user = user;
      self.historyDonationService.getDonations(self.user)
        .then( function( res ) {

          self.myData = res['docRef'];
          self.dataSource.data = self.myData;

          self.resultsLength = self.myData.length;
          self.dataSource.paginator = self.paginator;

          self.completed = true;
      });

    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }



}



