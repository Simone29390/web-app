import { Component, OnInit } from '@angular/core';
import {Firestore} from "../../firestore-cfg/firestore";
import {MatDialog, MatDialogRef, MatSnackBar} from "@angular/material";
import {FirebaseUsers} from "../../firestore-cfg/firebase.users";
import {StringUtils} from "../../utility/string.utils";
import {RegistrationStepperComponent} from "../../registration-stepper/registration-stepper.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegistrationDialogComponent} from "../../registration-dialog/registration-dialog.component";
import {FirebaseQM} from "../../firestore-cfg/firebaseQueryManager";

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_MIN_LENGTH = 6;

@Component({
  selector: 'app-information-account-required',
  templateUrl: './information-account-required.component.html',
  styleUrls: ['./information-account-required.component.css']
})
export class InformationAccountRequiredComponent implements OnInit {

  private REGISTER: number = 1;
  public isLinear: boolean = true;
  public firstFormGroup: FormGroup;
  public hide: boolean = true;
  public login = true;
  private fs: Firestore;
  private fsQM: FirebaseQM;
  private fb: any;
  isError = false;
  errorCode;
  user;

  constructor( private _formBuilder: FormBuilder,
               public dialog: MatDialog,
               private dialogRef: MatDialogRef<RegistrationStepperComponent>,
               public snackBar: MatSnackBar) {

    this.fs = new Firestore();
    this.fsQM = new FirebaseQM();

    this.fb = this.fs.getConfiguredFirebase();
  }

  public ngOnInit(): void {

    let self = this;

    /**
     * First block of registration module
     * @type {FormGroup}
     */
    this.firstFormGroup = this._formBuilder.group({
      name:     [ StringUtils.EMPTY, Validators.required ],
      address:    [ StringUtils.EMPTY ],
      telephone:  [ StringUtils.EMPTY ]
    });


    this.fb.auth().onAuthStateChanged( function( user ) {

      if ( Boolean( user ) && user != null) {
        self.user = user;
      } else {
      }
    });
  }

  private fillUserProperties(): any {
    return {
      name: this.firstFormGroup.controls[ 'name' ].value,
      phone: this.firstFormGroup.controls[ 'telephone' ].value,
      address: this.firstFormGroup.controls[ 'address' ].value,
      level: 'user',
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
