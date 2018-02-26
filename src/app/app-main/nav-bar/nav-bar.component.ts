import {Component, Input, OnInit} from '@angular/core';
import {Firestore} from "../../firestore-cfg/firestore";
import * as firebase from "firebase";
import Query = database.Query;
import {FirebaseQM} from "../../firestore-cfg/firebaseQueryManager";
import {database} from "firebase";
import {FLY_IN_OUT_ANIMATION} from "../../animations/fly-in-out.animation";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  animations: [ FLY_IN_OUT_ANIMATION ]
})
export class NavBarComponent implements OnInit {
  isMobile = true;
  private fs: Firestore;
  private fb: firebase.app.App;

  state: string = 'active';

  isLogged: boolean;
  isValidated: boolean;

  constructor() {
    this.fs = new Firestore();
    this.fb = this.fs.getConfiguredFirebase();

    // User screen size
    const screenHeight = window.screen.height;
    const screenWidth = window.screen.width;

    if (screenWidth <= 1024) {

      this.isMobile = true;
    } else {

      this.isMobile = false;
    }



  }

  ngOnInit() {

    let self = this;

    this.fb.auth().onAuthStateChanged( function( user ) {

      if ( Boolean( user ) && user != null) {

        self.isLogged = true;
        user.providerData.forEach(function (profile) {
          self.isValidated = user.emailVerified || profile.providerId == 'google.com';
        });
      } else {
        self.isLogged = false;
        self.isValidated = false;
      }
    });
  }


}
