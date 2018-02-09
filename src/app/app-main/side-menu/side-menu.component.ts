import {Component, OnInit, ViewChild} from '@angular/core';
import {SidenavService} from "./sidenave-service";
import {MatSidenav} from "@angular/material";
import {MainViewService} from "../main-view/main-view-service";

import {Firestore} from "../../firestore-cfg/firestore";
import {FirebaseQM} from "../../firestore-cfg/firebaseQueryManager";
import * as firebase from "firebase";
import Query = firebase.database.Query;
import {MatDialog} from "@angular/material";
import {RegistrationDialogComponent} from "../../registration-dialog/registration-dialog.component";
import {RegistrationStepperComponent} from "../../registration-stepper/registration-stepper.component";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  @ViewChild( 'sidenav' )
  private sidenav: MatSidenav;
  mode;
  isMobile;

  private qm: FirebaseQM;
  private fs: Firestore;
  private fb: firebase.app.App;

  isLogged;
  public opened: boolean;

  constructor( private sidenavService: SidenavService) {
    this.fs = new Firestore();
    this.fb = this.fs.getConfiguredFirebase();

    const screenHeight = window.screen.height;
    const screenWidth = window.screen.width;

    if (screenWidth <= 1024) {
      this.opened = false;
      this.mode = 'over';
      this.isMobile = true;
    } else {
      this.opened = false;
      this.mode = 'side';
      this.isMobile = false;
    }

  }

  ngOnInit() {

    let self = this;

    this.sidenavService.setSidenav( this.sidenav );

    this.fb.auth().onAuthStateChanged( function( user ) {

      if ( Boolean( user ) && user != null) {
        self.opened = false;
      } else {
        self.opened = true;
      }
    });


  }

}
