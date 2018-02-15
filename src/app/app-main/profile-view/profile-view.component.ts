import { Component, OnInit } from '@angular/core';
import {Firestore} from "../../firestore-cfg/firestore";
import {FirebaseQM} from "../../firestore-cfg/firebaseQueryManager";
import * as firebase from "firebase";
import Query = firebase.database.Query;
import {MatDialog} from "@angular/material";
import {RegistrationDialogComponent} from "../../registration-dialog/registration-dialog.component";
import {RegistrationStepperComponent} from "../../registration-stepper/registration-stepper.component";
import {SidenavService} from "../side-menu/sidenave-service";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";

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

  isLogged;

  constructor( public dialog: MatDialog, private sidenav: SidenavService ) {
    this.qm = new FirebaseQM();
    this.fs = new Firestore();
    this.fb = this.fs.getConfiguredFirebase();
    this.completed = false;


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
        self.userkey = user['uid'];
        self.photoURL = user['photoURL'];
        self.getProfile(self.userkey);
      } else {
        self.isLogged = false;
      }
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

  googleLogin(): void {

    this.toggleSidenav();

    this.fs.googleLogin();
  }

  public openDialog(): void {
    this.toggleSidenav();

    let dialogRef = this.dialog.open( RegistrationDialogComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log( 'The dialog was closed' );
    });
  }

  public openDialogReg(): void {

    this.toggleSidenav();

    let dialogRef = this.dialog.open( RegistrationStepperComponent, {
      height: !this.isMobile ? '90%' : '70%',
      width: !this.isMobile ? '30%' : '100%',
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log( 'The dialog was closed' );
    });
  }


  public toggleSidenav(): void {
    this.sidenav.toggle();
    //this.sidenav1.toggle();
  }


  public openDialogUpdate(): void {

    this.toggleSidenav();

    let dialogRef = this.dialog.open( EditProfileComponent, {
      height: !this.isMobile ? '90%' : '70%',
      width: !this.isMobile ? '30%' : '100%',
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log( 'The dialog was closed' );
    });
  }

}
