
import {Component, Injectable, NgModule, OnDestroy, OnInit, Pipe, PipeTransform} from '@angular/core';
import * as firebase from "firebase";
import Query = firebase.database.Query;
import {FirebaseQM} from "../../firestore-cfg/firebaseQueryManager";
import {Firestore} from "../../firestore-cfg/firestore";
import * as _ from 'lodash';
import {ContainerViewService} from "../container-view/container-view.service";
import {ShowcaseService} from "./showcase-service";
import { Subscription } from 'rxjs/Rx';
import {SearchFilter} from "./showcase.component";




@Component({
  selector: 'app-showcase-won',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
@Injectable()
export class ShowcaseWonComponent implements OnInit, OnDestroy {
  private fs: Firestore;
  private filter: object;
  private qm: FirebaseQM;
  insertions = [];
  public completed: boolean;
  private fb: firebase.app.App;
  private user;
  haNoItems;
  numCol;
  rowHeight;
  mobile;
  isValidated = true;
  _subscription: Subscription;

  constructor( public containerViewService: ContainerViewService, public showcaseService: ShowcaseService ) {
    this.fs = new Firestore();
    this.fb = this.fs.getConfiguredFirebase();
    this.qm = new FirebaseQM();

    this.completed = false;


    this.showcaseService.set(
      {checked: [], disabled: true}
    );

    // User screen size
    const screenHeight = window.screen.height;
    const screenWidth = window.screen.width;

    if (screenWidth <= 1024) {
      this.numCol = 2;
      this.rowHeight = '270px';
      this.mobile = true;

      if (screenWidth < 768) {
        this.rowHeight = '190px';
      }

    } else {
      this.numCol = 4;
      this.rowHeight = '270px';
      this.mobile = false;
    }

    this._subscription = this.showcaseService.filter.subscribe((value) => {
      console.log(value)
      this.filter = value;

      if (this.user) {
        this.combineInsetions();
      }
    });
  }

  ngOnInit() {
    let self = this;

    this.fb.auth().onAuthStateChanged( function( user ) {
      if ( Boolean( user ) && user != null) {
          self.user = user;
          self.combineInsetions();
      }
    });


  }


  public combineInsetions() {

    const self = this;

    // Init view
    self.insertions = [];
    this.completed = false;
    self.haNoItems = true;

    const ref = this.qm.getReference( 'Donation' );
    const groupRef = this.qm.getReference( 'Insertion' );

    const disabled = self.filter['disabled'];
    const checked = self.filter['checked'];

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

            let cat =  snapshot1.child('category').val();

            if ((disabled || checked[cat - 1]) && state === 'expired' && auctionHigherBidder === self.user['uid']) {

              self.insertions.push({
                key           : snapshot1.child('key').val(),
                datetime      : snapshot1.child('datetime').val(),
                category      : snapshot1.child('category').val(),
                title         : snapshot1.child('title').val(),
                description   : snapshot1.child('description').val(),
                image1         : snapshot1.child('images').child('image1').val(),
                image3         : snapshot1.child('images').child('image2').val(),
                image4         : snapshot1.child('images').child('image3').val(),
                image5         : snapshot1.child('images').child('image4').val(),
                image6         : snapshot1.child('images').child('image5').val(),
                image7         : snapshot1.child('images').child('image6').val(),
              });

              self.insertions = _.uniqBy(self.insertions, 'key');
              self.haNoItems = false;

              self.containerViewService.setNumbOfDonationWon(self.insertions.length);
            }

            self.completed = true;
          });

      });

    });

  }


  sendVerification() {
    this.user.sendEmailVerification();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
