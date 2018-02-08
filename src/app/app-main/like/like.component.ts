import {Component, Input, OnInit} from '@angular/core';
import {Firestore} from "../../firestore-cfg/firestore";
import * as firebase from "firebase";
import Query = database.Query;
import {FirebaseQM} from "../../firestore-cfg/firebaseQueryManager";
import {database} from "firebase";

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {
// Firestore object
  private fs: Firestore;

  @Input() private key: string;

  // Firebase initialized object
  private fb: firebase.app.App;
  private user;
  private qm: FirebaseQM;
  public isMyFavorite;
  private uid;
  isLogged;

  constructor() {
    this.fs = new Firestore();
    this.fb = this.fs.getConfiguredFirebase();
    this.qm = new FirebaseQM();
  }

  ngOnInit() {
    let self = this;

    this.fb.auth().onAuthStateChanged( function( user ) {

      if ( Boolean( user ) && user != null) {
        self.isLogged = true;
        self.user = user;
        self.checkIfFavoriteSetted(user['uid']);
      } else {
        self.isLogged = false;
      }
    });

    self.isMyFavorite = false;
  }

  public pushFavorite() {
    let self = this;

    console.log(self.uid)
    if (!self.uid) return;

    const ref = this.qm.getReference( 'Favorite' ).child(self.uid);

    if (self.isMyFavorite) {
      let query: Query = ref
        .orderByChild( 'key')
        .equalTo( self.key);

      query.once('value').then(function (querySnapshot) {

        querySnapshot.forEach(function (snapshot) {

          let key = snapshot.child('key').val();

          if (key === self.key) {
            ref.child(snapshot.key).remove().then((snap) => {
              self.checkIfFavoriteSetted(self.uid);
            });
          }
        });
      });
    } else {
      ref.push().set(
        {key: self.key}
      ).then((snap) => {
        self.checkIfFavoriteSetted(self.uid);
      });
    }
  }

  public checkIfFavoriteSetted(uid: string) {

    let self = this;

    self.uid = uid;

    const ref = this.qm.getReference( 'Favorite' );

    let query: Query = ref.child(self.uid)
      .orderByChild( 'key')
      .equalTo( self.key);

    query.once('value').then(function (querySnapshot) {

      if (querySnapshot.exists()) {
        self.isMyFavorite = true;
      } else  {
        self.isMyFavorite = false;
      }

    });
  }
}
