import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Firestore } from '../firestore-cfg/firestore';

import { EventEmitterService } from "../services/event-emitter-service/event-emitter.service";
import * as firebase from "firebase";

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_MIN_LENGTH = 6;

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.css']
})

export class RegistrationDialogComponent implements OnInit {
  // Declare property of password input type
  public hide = true;

  // Forms group
  public FormGroup: FormGroup;

  // Firestore object
  private fs: Firestore;

  private db: firebase.firestore.Firestore;

  constructor(
    public dialogRef: MatDialogRef<RegistrationDialogComponent>,
    private _formBuilder: FormBuilder,
    private eventEmitter: EventEmitterService,
    @Inject(MAT_DIALOG_DATA) public data: any ) {

    // Initialize a Firestore object
    this.fs = new Firestore();

    this.db = this.fs.getFirestoreDB();
  }

  public ngOnInit() {
    this.FormGroup = this._formBuilder.group({
      email: [ '', Validators.pattern( EMAIL_REGEX ) ],
      password: ['', Validators.minLength( PWD_MIN_LENGTH )]
    });
  }

  public logIn(): void {
    let self = this;

    let email = this.FormGroup.controls[ 'email' ].value,
      password = this.FormGroup.controls[ 'password' ].value;

    this.fs.getConfiguredFirebase()
      .auth()
      .signInWithEmailAndPassword( email, password )
      .then( function ( success ) {
        self.logged();
      })
      .catch(function( error ) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  private logged(): void {
    this.eventEmitter.emitEventEmitter({
      logged: true
    });

    this.dialogRef.close();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
