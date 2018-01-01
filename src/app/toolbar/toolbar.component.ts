import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

// Custom Library
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';

import { Firestore } from "../firestore-cfg/firestore";
import { User } from "../firestore-cfg/user";
import {Utils} from "../utility/utils";
import * as firebase from "firebase";
import {FirestoreUsers} from "../firestore-cfg/firestore.users";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit  {

  // Firestore object
  private fs: Firestore;

  // Firebase initialized object
  private fb: firebase.app.App;

  private fsU: FirestoreUsers;

  // Indicates if user is logged
  public logged: boolean;

  // Current logged user
  private u: User;

  constructor( public dialog: MatDialog ) {
    // Initialize a Firestore and FirestoreQueryManager objects
    this.fs = new Firestore();
    this.fb = this.fs.getConfiguredFirebase();

    this.fsU = new FirestoreUsers();

    // Current logged state
    this.logged = false;
  }

  /**
   * On init component, check if user is logged or not.
   */
  public ngOnInit(): void {
    let self = this;

    this.fb.auth().onAuthStateChanged( function( user ) {
        self.logged = Boolean( user );

        // Refresh view
        Utils.refreshView();
    });
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
}
