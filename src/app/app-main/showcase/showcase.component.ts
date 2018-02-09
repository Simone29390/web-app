import {Component, Injectable, NgModule, OnDestroy, OnInit} from '@angular/core';
import * as firebase from "firebase";
import Query = firebase.database.Query;
import {FirebaseQM} from "../../firestore-cfg/firebaseQueryManager";
import { Pipe, PipeTransform} from '@angular/core';
import {ShowcaseService} from "./showcase-service";
import { Subscription } from 'rxjs/Rx';
import {Firestore} from "../../firestore-cfg/firestore";

@Pipe({
  name: 'searchFilter'
})
export class SearchFilter implements PipeTransform {
  transform(value: any, args?: any): any {

    if (!value) {
      return null;
    }
    if (!args) {
      return value;
    }

    args = args.toLowerCase();

    return value.filter(function(item){
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }
}


@Pipe({
  name: 'sort'
})
export class ArraySortPipe implements PipeTransform {
  transform(array: Array<any>): Array<string> {
    array.sort((a: any, b: any) => {
      if (a.timemillis < b.timemillis) {
        return -1;
      } else if (a.timemillis > b.timemillis) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}



@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
@Injectable()
export class ShowcaseComponent implements OnInit, OnDestroy {
  private filter: object;
  private qm: FirebaseQM;
  insertions;
  public completed: boolean;
  _subscription: Subscription;
  haNoItems;
  imagesArray = [];
  numCol;
  rowHeight;
  mobile;
  private fs: Firestore;
  private fb: firebase.app.App;
  private user: firebase.User;
  isLogged: boolean;
  isValidated = true;

  constructor( public showcaseService: ShowcaseService ) {
    this.qm = new FirebaseQM();
    this.fs = new Firestore();
    this.fb = this.fs.getConfiguredFirebase();

    this.fs = new Firestore();
    this.fb = this.fs.getConfiguredFirebase();


    this.completed = false;
    this.showcaseService.set(
      {checked: [], disabled: true}
    );

    // User screen size
    const screenHeight = window.screen.height;
    const screenWidth = window.screen.width;

    if (screenWidth <= 768) {
      this.numCol = 2;
      this.rowHeight = '210px';
      this.mobile = true;
    } else {
      this.numCol = 3;
      this.rowHeight = '270px';
      this.mobile = false;
    }

  }

  ngOnInit() {
    let self = this;

    this.fb.auth().onAuthStateChanged( function( user ) {

      if ( Boolean( user ) && user != null) {
        self.isLogged = true;
        user.providerData.forEach(function (profile) {
          self.isValidated = user.emailVerified || profile.providerId == 'google.com';
        });
        self.user = user;
      } else {
        self.isLogged = false;
        self.isValidated = true;
      }
    });



    this._subscription = this.showcaseService.filter.subscribe((value) => {
      this.filter = value;

      this.combineInsetions();
    });
  }

  sendVerification() {
    this.user.sendEmailVerification();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  public combineInsetions() {

    const self = this;

    // Init view
    self.insertions = [];
    this.completed = false;
    self.haNoItems = true;

    const ref = this.qm.getReference( 'Insertion' );

    const disabled = this.filter['disabled'];
    const checked = this.filter['checked'];

    let query: Query = ref
      .orderByChild( 'state')
      .equalTo( 'published');

    query.once('value').then(function (querySnapshot) {

      const obj: any = [];

      querySnapshot.forEach(function (snapshot) {

        let cat =  snapshot.child('category').val() ;

        if (disabled || checked[cat - 1]) {

          obj.push({
            key           : snapshot.child('key').val(),
            datetime      : snapshot.child('datetime').val(),
            category      : snapshot.child('category').val(),
            title         : snapshot.child('title').val(),
            description   : snapshot.child('description').val(),
            timemillis   : snapshot.child('timemillis').val(),
            image1         : snapshot.child('images').child('image1').val(),
            image3         : snapshot.child('images').child('image2').val(),
            image4         : snapshot.child('images').child('image3').val(),
            image5         : snapshot.child('images').child('image4').val(),
            image6         : snapshot.child('images').child('image5').val(),
            image7         : snapshot.child('images').child('image6').val(),
          });
        }
      });

      self.insertions = obj.sort((obj1, obj2) => {
        if (obj1.timemillis > obj2.timemillis) {
          return -1;
        }

        if (obj1.timemillis < obj2.timemillis) {
          return 1;
        }

        return 0;
      });

      self.haNoItems = (self.insertions.length <= 0);

      self.completed = true;
    }).catch(function (error) {
    });

  }

  public set(obj: object): void {
    this.filter = obj;
    console.log(obj);
    this.completed = false;
  }

}
