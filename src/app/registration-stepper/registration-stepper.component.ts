import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore } from "../firestore-cfg/firestore";
import { FirestoreQM } from "../firestore-cfg/firestoreQueryManager";
import {StringUtils} from "../utility/string.utils";
import {FirebaseUsers} from "../firestore-cfg/firebase.users";
import {MatDialog, MatDialogRef, MatSnackBar} from "@angular/material";
import {RegistrationDialogComponent} from "../registration-dialog/registration-dialog.component";
import {utils} from "protractor";
import {Utils} from "../utility/utils";

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_MIN_LENGTH = 6;

/**
 * @title Stepper overview
 */
@Component({
  selector: 'app-registration-stepper',
  templateUrl: './registration-stepper.component.html',
  styleUrls: ['./registration-stepper.component.css']
})
export class RegistrationStepperComponent implements OnInit {

  private REGISTER: number = 1;
  public isLinear: boolean = true;
  public firstFormGroup: FormGroup;
  public hide: boolean = true;
  public login = true;
  private fs: Firestore;
  private fsQM: FirestoreQM;
  private fb: any;
  isError = false;
  errorCode;
  constructor( private _formBuilder: FormBuilder,
               public dialog: MatDialog,
               private dialogRef: MatDialogRef<RegistrationStepperComponent>,
               public snackBar: MatSnackBar) {

    this.fs = new Firestore();
    this.fsQM = new FirestoreQM();

    this.fb = this.fs.getConfiguredFirebase();
  }

  public ngOnInit(): void {
    /**
     * First block of registration module
     * @type {FormGroup}
     */
    this.firstFormGroup = this._formBuilder.group({
      name:     [ StringUtils.EMPTY, Validators.required ],
      lastname: [ StringUtils.EMPTY, Validators.required ],
      email:    [ StringUtils.EMPTY, Validators.pattern( EMAIL_REGEX ) ],
      address:    [ StringUtils.EMPTY ],
      password:   [ StringUtils.EMPTY, Validators.minLength( PWD_MIN_LENGTH )],
      telephone:  [ StringUtils.EMPTY ]
    });
  }

  private fillUserProperties(): any {
    return {
      name: this.firstFormGroup.controls[ 'name' ].value + ' ' +
        this.firstFormGroup.controls[ 'lastname' ].value,
      phone: this.firstFormGroup.controls[ 'telephone' ].value,
      address: this.firstFormGroup.controls[ 'address' ].value,
      level: 'user',
      email: this.firstFormGroup.controls[ 'email' ].value,
    };
  }

  googleLogin(): void {
    this.fs.googleLogin();
  }

  public register( evt: Event ): void {
    if( evt[ 'selectedIndex' ] !== this.REGISTER )
      return;

    // Wrapper of this object
    let self = this;

    let fsU: FirebaseUsers = new FirebaseUsers();

    // Creates new user
    fsU.createUser (

      this.firstFormGroup.controls[ 'email' ].value,
      this.firstFormGroup.controls[ 'password' ].value

    ).then( function( res ) {

      if ( res.success ) {

        fsU.updateUser(self.fillUserProperties()).then( function( res ) {

          console.log(res)

          if ( res.success ) {

            //this.openSnackBar("Accedi alla tua email per convalidare l'Account","Avviso");

            self.close();
          } else {
            self.isError = true;
            self.errorCode = res.errorMessage;
          }
        }).catch(function (error) {
          self.isError = true;
          self.errorCode = error['errorMessage'];
          });
      } else {
        self.isError = true;
        self.errorCode = res.errorMessage;
      }
    }).catch(function (error) {
      self.isError = true;
      self.errorCode = error['errorMessage'];
    });
  }

  public openDialog(): void {
      let dialogRef = this.dialog.open( RegistrationDialogComponent, {

      });

    dialogRef.afterClosed().subscribe(result => {
      //console.log( 'The dialog was closed' );
    });
  }

  public close() {
      this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
