import { Component, OnInit, NgModule } from '@angular/core';
import {UploadFileService} from "../../utility/upload/fileupload.service";
import {FileUpload} from "../../utility/upload/fileupload";
import {NgForm} from "@angular/forms";
import {FirestoreInsertion} from "../../firestore-cfg/firestore.insertion";
import {AngularFireAuth} from "angularfire2/auth";
import {User} from "firebase";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [ AngularFireAuth ]
})
export class InputComponent implements OnInit {

  iCollection: AngularFirestoreCollection<Object>;
  selectedCategory = '';
  description = '';
  title = '';
  price = '';
  fileUploaded: {data: Array<FileUpload>} = {data: []};
  progress: {percentage: number} = {percentage: 0};
  fInsertion: FirestoreInsertion = new FirestoreInsertion();
  user: User = null;
  categories = [
    {value: '0', viewValue: 'Computers & Mobile Phone'},
    {value: '1', viewValue: 'Clothing'},
    {value: '2', viewValue: 'Sports equipment'},
    {value: '3', viewValue: 'Kitchen utensils'},
    {value: '4', viewValue: 'House & Garden'},
    {value: '5', viewValue: 'Animals & Accessories'},
    {value: '6', viewValue: 'Comics and Newspapers'},
    {value: '7', viewValue: 'Collectibles'},
    {value: '8', viewValue: 'Other Categories'},
  ];

  constructor(
    private upload: UploadFileService,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    ) {

    this.iCollection = this.firestore.collection<FirestoreInsertion>( 'insertions' );

    this.auth.authState.subscribe( user => {
      if ( user ) {
        this.user = user;
      }
    });
  }

  ngOnInit() {
  }

  selectFile( event ) {

    const f = event.target.files.item(0);

    if ( f.type.match( 'image/*' ) ) {

      this.upload.pushFileToStorage(
        new FileUpload( f ),
        'images',
        this.progress,
        this.fileUploaded
      );
    } else {

      alert('invalid format!');
    }
  }

  deleteUploaded( f: FileUpload ) {

    this.upload.deleteFileUpload( f, 'images' );

    this.fileUploaded.data.splice( this.fileUploaded.data.indexOf( f ), 1 );
  }

  changeShape( shape ) {

    this.selectedCategory = shape.value;
  }

  pushMe( ) {

    if ( this.title || this.description || this.selectedCategory || this.fileUploaded.data.length > 0 ) {

      this.fInsertion.setParams(

        this.user.uid,
        new Date(),
        this.title,
        this.description,
        this.selectedCategory,
        this.price,
        this.fileUploaded.data[0].url
      );

      this.iCollection.add(

        this.fInsertion.getParams()

      ).then(( item ) => {
        this.resetPost();

      }).catch( error => console.log( error ) );

    } else {

      alert('Some informations missed!');
    }
  }
  resetPost( ) {

    this.title = '';
    this.description = '';
    this.price = '';
    this.fileUploaded.data = [];
  }
}
