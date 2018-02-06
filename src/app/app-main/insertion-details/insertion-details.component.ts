import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Params} from "@angular/router";
import * as firebase from "firebase";
import Query = firebase.database.Query;
import {FirebaseQM} from "../../firestore-cfg/firebaseQueryManager";
import {MatDialog} from "@angular/material";
import {DonationComponent} from "../donation/donation.component";
import {Firestore} from "../../firestore-cfg/firestore";

@Component({
  selector: 'app-insertion-details',
  templateUrl: './insertion-details.component.html',
  styleUrls: ['./insertion-details.component.css']
})
@Injectable()
export class InsertionDetailsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  private qm: FirebaseQM;

  private fs: Firestore;
  private fb: firebase.app.App;

  lat: number = 45.7850677;
  lng: number = 8.8810136;
  zoom: number = 8;

  public completed: boolean;

  primaryImage;
  isHigherBidder;
  key;
  datetime;
  category;
  title;
  images;
  description;
  timeToEnd;
  auctionHigherBidToCompare;
  auctionHigherBidder;
  userkey;
  imagesArray = [];

  constructor(private activatedRoute: ActivatedRoute, public dialog: MatDialog ) {
    this.qm = new FirebaseQM();
    this.fs = new Firestore();
    this.fb = this.fs.getConfiguredFirebase();
    this.completed = false;
  }

  ngOnInit() {

    let self = this;

    this.fb.auth().onAuthStateChanged( function( user ) {
      self.userkey = user['uid'];

      self.subscription = self.activatedRoute.paramMap.subscribe(params => {
        let id = params.get('id');

        self.getInsertion( id );
      });
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

  public getInsertion(id: string) {

    const self = this;

    const ref = this.qm.getReference( 'Insertion' );

    let query: Query = ref.child(id);

    query.once('value').then(function (querySnapshot) {

      self.key =  querySnapshot.child('key').val();
      self.datetime =  querySnapshot.child('datetime').val();
      self.category =  querySnapshot.child('category').val();
      self.title =  querySnapshot.child('title').val();
      self.description =  querySnapshot.child('description').val();
      self.timeToEnd =  querySnapshot.child('timeToEnd').val();
      self.auctionHigherBidToCompare = querySnapshot.child('auctionHigherBidToCompare').val();
      self.auctionHigherBidder = querySnapshot.child('auctionHigherBidder').val();

      let image = [];
      image[0] =  querySnapshot.child('images').child('image1').val();
      image[1] =  querySnapshot.child('images').child('image2').val();
      image[2] =  querySnapshot.child('images').child('image3').val();
      image[3] =  querySnapshot.child('images').child('image4').val();
      image[4] =  querySnapshot.child('images').child('image5').val();
      image[5] =  querySnapshot.child('images').child('image6').val();

      for (let i = 0; i < image.length; i++) {
        if (image[i] != null) {
          self.imagesArray.push(image[i]);
        }
      }

      self.isHigherBidder = (self.auctionHigherBidder === self.userkey);

      self.primaryImage = self.imagesArray[0];

      self.completed = true;
    });
  }


  public changePrimaryImage(img: string) {
    this.primaryImage = img;
  }

  getCategoryName(id: string) {
    switch (id) {
      case '0':
        return 'Abbigliamento e accessori';
      case '1':
        return 'Elettrodomestici';
      case '2':
        return 'Film e Libri';
      case '3':
        return 'Infanzia e Bambini';
      case '4':
        return 'Mobili';
      case '5':
        return 'Oggetti da Cucina';
      case '6':
        return 'Oggetti di Arredamento';
      case '7':
        return 'Oggetti Sportivi';
      case '8':
        return 'Altre Categorie';
    }
    return 'Altre Categorie';
  }

  public openDialog(): void {
    let dialogRef = this.dialog.open( DonationComponent, {
      height: '90%',
      width: '30%',
    });
    dialogRef.componentInstance.auctionHigherBidToCompare = this.auctionHigherBidToCompare;
    dialogRef.componentInstance.key = this.key;
    dialogRef.componentInstance.userkey = this.userkey;

    dialogRef.afterClosed().subscribe(result => {
      //console.log( 'The dialog was closed' );
    });
  }
}
