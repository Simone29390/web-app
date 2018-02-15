import { Component, OnInit } from '@angular/core';
import {Firestore} from "../../firestore-cfg/firestore";
import * as firebase from "firebase";
import {FirebaseQM} from "../../firestore-cfg/firebaseQueryManager";
import Query = firebase.database.Query;
import {MatDialog, MatDialogRef, MatSnackBar} from "@angular/material";
import {RegistrationStepperComponent} from "../../registration-stepper/registration-stepper.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FirestoreQM} from "../../firestore-cfg/firestoreQueryManager";
import {StringUtils} from "../../utility/string.utils";

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_MIN_LENGTH = 6;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  private fs: Firestore;
  // Firebase initialized object
  private fb: firebase.app.App;
  private user;
  private qm: FirebaseQM;
  private name;
  private level;
  private email;
  private phone;
  private address;
  private userkey;
  private UPDATE: number = 1;
  public isLinear: boolean = true;
  public firstFormGroup: FormGroup;
  public hide: boolean = true;
  public login = true;
  isError = false;
  errorCode;


  constructor( private _formBuilder: FormBuilder,
               public dialog: MatDialog,
               private dialogRef: MatDialogRef<EditProfileComponent>,
               public snackBar: MatSnackBar ) {
    this.fs = new Firestore();
    this.fb = this.fs.getConfiguredFirebase();
    this.qm = new FirebaseQM();
  }

  ngOnInit() {


    let self = this;

    this.fb.auth().onAuthStateChanged( function( user ) {

      if ( Boolean( user ) && user != null) {
        self.user = user;
        self.getUserProfile(self.user);
      } else {
      }
    });

  }

  compilefields(name: string, address: string, phone: string) {
    /**
     * First block of registration module
     * @type {FormGroup}
     */
    console.log(name + address + phone);

    this.firstFormGroup = this._formBuilder.group({
      name:     [ name, Validators.required ],
      address:    [ address ],
      telephone:  [ phone ]
    });
  }

  private fillUserProperties(): any {
    return {
      name: this.firstFormGroup.controls[ 'name' ].value,
      phone: this.firstFormGroup.controls[ 'telephone' ].value,
      address: this.firstFormGroup.controls[ 'address' ].value,
    };
  }

  getUserProfile(user: firebase.User) {

    let self = this;
    let queryManager: FirebaseQM = new FirebaseQM();

    const ref = queryManager.getReference( 'User' );

    const query: Query = ref.child( user.uid );

    query.once('value').then(function (querySnapshot) {

      if (querySnapshot.exists()) {
        self.name = querySnapshot.child('name');
        self.level = querySnapshot.child('level');
        self.email = querySnapshot.child('email');
        self.phone = querySnapshot.child('phone');
        self.address = querySnapshot.child('address');
        self.userkey = querySnapshot.child('userkey');

        self.compilefields(self.name, self.address, self.phone);
      } else {
        self.compilefields(user.displayName, StringUtils.EMPTY, user.phoneNumber);
      }
    });

  }

  public register( evt: Event ): void {
    if ( evt[ 'selectedIndex' ] !== this.UPDATE ) return;
    this.updateUserProfile(this.user);
  }

  updateUserProfile(user: firebase.User) {
    let self = this;
    let queryManager: FirebaseQM = new FirebaseQM();

    const ref = queryManager.getReference( 'User' );

    ref.child( user.uid ).update(
      self.fillUserProperties()
    ).then((snap) => {
      console.log('success')
    }).catch(function (error) {
      self.isError = true;
      self.errorCode = error;
    });

  }

  public close() {
    this.dialogRef.close();
  }
}
