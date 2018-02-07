import { Component, OnInit } from '@angular/core';
import {Firestore} from "../../firestore-cfg/firestore";
import {FirebaseQM} from "../../firestore-cfg/firebaseQueryManager";
import * as firebase from "firebase";
import Query = firebase.database.Query;

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  private qm: FirebaseQM;
  isMobile;
  private fs: Firestore;
  private fb: firebase.app.App;

  completed;
  userkey;
  name;
  level;
  photoURL;

  constructor() {
    this.qm = new FirebaseQM();
    this.fs = new Firestore();
    this.fb = this.fs.getConfiguredFirebase();
    this.completed = false;

    // User screen size
    const screenHeight = window.screen.height;
    const screenWidth = window.screen.width;

    if (screenWidth <= 768) {

      this.isMobile = true;
    } else {

      this.isMobile = false;
    }
  }

  ngOnInit() {

    let self = this;

    this.fb.auth().onAuthStateChanged( function( user ) {
      self.userkey = user['uid'];
      self.photoURL = user['photoURL'];
      self.getProfile(self.userkey);
    });
  }

  public getProfile(userKey: string) {

    const self = this;

    const ref = this.qm.getReference( 'User' );

    let query: Query = ref.child(userKey);

    query.once('value').then(function (querySnapshot) {

      self.name =  querySnapshot.child('name').val();
      self.level =  querySnapshot.child('level').val();

      self.completed = true;
    });
  }

}
