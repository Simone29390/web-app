import {Component, Input, OnInit} from '@angular/core';
import {Firestore} from "../../firestore-cfg/firestore";
import * as firebase from "firebase";
import Query = database.Query;
import {FirebaseQM} from "../../firestore-cfg/firebaseQueryManager";
import {database} from "firebase";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isMobile = true;
  private fs: Firestore;
  private fb: firebase.app.App;
  private user;
  isLogged: boolean;

  constructor() {
    this.fs = new Firestore();
    this.fb = this.fs.getConfiguredFirebase();

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

      if ( Boolean( user ) && user != null) {

        self.isLogged = true;
      } else {
        self.isLogged = false;
      }
    });
  }

}
