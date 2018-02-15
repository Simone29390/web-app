import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

// Custom Library
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';

import { Firestore } from "../firestore-cfg/firestore";
import { User } from "../firestore-cfg/user";
import {Utils} from "../utility/utils";
import * as firebase from "firebase";
import {FirestoreUsers} from "../firestore-cfg/firestore.users";
import {SidenavService} from "../app-main/side-menu/sidenave-service";
import {CategoryPanelService} from "../app-main/category-panel/category-panel-service";
import {FirebaseQM} from "../firestore-cfg/firebaseQueryManager";
import Query = firebase.database.Query;

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit  {

  isMobile;

  // Firestore object
  private fs: Firestore;

  // Firebase initialized object
  private fb: firebase.app.App;

  private fsU: FirestoreUsers;

  // Indicates if user is logged
  public logged: boolean;

  // Current logged user
  private u: User;

  constructor( public dialog: MatDialog, private sidenav: SidenavService , private sidenav1: CategoryPanelService) {
    // Initialize a Firestore and FirestoreQueryManager objects
    this.fs = new Firestore();
    this.fb = this.fs.getConfiguredFirebase();

    this.fsU = new FirestoreUsers();

    // Current logged state
    this.logged = false;

    const screenHeight = window.screen.height;
    const screenWidth = window.screen.width;

    if (screenWidth <= 1024) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  /**
   * On init component, check if user is logged or not.
   */
  public ngOnInit(): void {
    let self = this;

    this.fb.auth().onAuthStateChanged( function( user ) {
      self.logged = Boolean( user );

      if ( Boolean( user ) && user != null) {
        self.checkUserProfile(user);
      }
        // Refresh view
        Utils.refreshView();
    });
  }
  public toggleSidenav(): void {
    this.sidenav.toggle();
    //this.sidenav1.toggle();
  }

  /**
   * Retrieve the variable value
   * @returns {boolean}
   */
  public getUserPhoto(): string {
    return this.fsU.getLoggedUser().photoURL || '';
  }

  public logOut(): void {
    this.fb.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  public openDialog(): void {
    let dialogRef = this.dialog.open( RegistrationDialogComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log( 'The dialog was closed' );
    });
  }


  checkUserProfile(user: firebase.User) {
    let queryManager: FirebaseQM = new FirebaseQM();

    const ref = queryManager.getReference( 'User' );

    const query: Query = ref.child( user.uid );

    query.once('value').then(function (querySnapshot) {

      if (querySnapshot.exists()) {

        console.log(querySnapshot)
      } else  {
        ref.child( user.uid ).set(
          {
            name: user.displayName,
            level: 'user',
            email: user.email,
            phone: user.phoneNumber,
            address: '',
            userkey: user.uid
          }
        ).then((snap) => {
          console.log('success')
        }).catch(function (error) {
          console.log('error')
        });
      }
    });

  }
}
