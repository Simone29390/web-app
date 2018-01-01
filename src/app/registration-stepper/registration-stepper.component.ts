import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore } from "../firestore-cfg/firestore";
import { FirestoreQM } from "../firestore-cfg/firestoreQueryManager";

import {FileUploadService} from "../services/file-upload/file-upload.service";
import {MessagesHandlerService} from "../services/error-handler/messages-handler.service";
import {StringUtils} from "../utility/string.utils";
import {FirestoreUsers} from "../firestore-cfg/firestore.users";

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
  //
  private MESSAGE: string = 'Ooops!! Unable to upload the photo with that format';

  private REGISTER: number = 2;

  // Indicates that stepper is in linear mode
  public isLinear: boolean = true;

  // Forms group
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;

  // Image path used as background image
  public imagePath: string;

  // Declare property of password input type
  public hide: boolean = true;

  // Firestore object
  private fs: Firestore;
  private fsQM: FirestoreQM;

  // Firebase initialized object
  private fb: any;

  // File that represent Profile Image
  private imageBlob: File;

  constructor( private _formBuilder: FormBuilder,
               private _fileUploadService: FileUploadService,
               private _messagesHandler: MessagesHandlerService) {

    // Initialize a Firestore and FirestoreQueryManager objects
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
      password:   [ StringUtils.EMPTY, Validators.minLength( PWD_MIN_LENGTH )],
      telephone:  [ StringUtils.EMPTY ]
    });

    /**
     * Second block of registration module
     * @type {FormGroup}
     */
    this.secondFormGroup = this._formBuilder.group({
      profilePhoto: [ StringUtils.EMPTY, Validators.required ],
      gender: [ 'male', Validators.required ]
    });
  }

  public setSrcUrl( evt: any ): void {
    let self = this;

    // Retrieve File object
    let fileResponse = this._fileUploadService.getFile( evt, 'image/*' );

    if( fileResponse.success ) {
      // Validate profilePhoto form control
      this.secondFormGroup.controls[ 'profilePhoto' ].setValue(true );

      // Update profile image file
      this.imageBlob = fileResponse.file;

      // Use getBase64 to generate a background image path
      this._fileUploadService.getBase64( fileResponse.file )
        .then( function( res ) {
          // Set image background
          self.imagePath = res.toString();
        })
    } else if( !fileResponse.success && fileResponse.error === this._fileUploadService.UNSUPPORTED_EXTENSION ) {
      this._messagesHandler.openSnackBar( self.MESSAGE );
    }
  }

  private fillUserProperties(): any {
    return {
      firstName: this.firstFormGroup.controls[ 'name' ].value,
      lastName: this.firstFormGroup.controls[ 'lastname' ].value,
      phoneNumber: this.firstFormGroup.controls[ 'telephone' ].value,
      photoURL: this.imageBlob,
      gender: this.secondFormGroup.controls[ 'gender' ].value
    };
  }

  public register( evt: Event ): void {
    if( evt[ 'selectedIndex' ] !== this.REGISTER )
      return;

    // Wrapper of this object
    let self = this;

    let fsU: FirestoreUsers = new FirestoreUsers();

    // Creates new user
    fsU.createUser (
      this.firstFormGroup.controls[ 'email' ].value,
      this.firstFormGroup.controls[ 'password' ].value
    ).then( function( res ) {
      fsU.updateUser( self.fillUserProperties() );
    });
  }
}
