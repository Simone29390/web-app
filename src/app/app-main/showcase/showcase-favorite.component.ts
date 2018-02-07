import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import Query = firebase.database.Query;
import {FirebaseQM} from "../../firestore-cfg/firebaseQueryManager";
import {Firestore} from "../../firestore-cfg/firestore";

@Component({
  selector: 'app-showcase-favorite',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseFavoriteComponent implements OnInit {
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

  constructor(  ) {
    this.fs = new Firestore();
    this.fb = this.fs.getConfiguredFirebase();
    this.qm = new FirebaseQM();

    this.completed = false;

    // User screen size
    const screenHeight = window.screen.height;
    const screenWidth = window.screen.width;

    if (screenWidth <= 768) {
      this.numCol = 2;
      this.rowHeight = '180px';
      this.mobile = true;
    } else {
      this.numCol = 4;
      this.rowHeight = '270px';
      this.mobile = false;
    }
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
    self.haNoItems = true;

    const ref = this.qm.getReference( 'Favorite' );
    const groupRef = this.qm.getReference( 'Insertion' );

    let query: Query = ref.child(self.user['uid']);

    query.once('value').then(function (querySnapshot) {

      const obj: any = [];

      querySnapshot.forEach(function (snapshot) {

        let key = snapshot.child('key').val();
        groupRef.child(key).once('value').then(function ( snapshot1 ) {

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
        });

        self.haNoItems = false;
      });

      self.completed = true;
    });

  }


}
