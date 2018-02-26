import {Component, Injectable, NgModule, OnDestroy, OnInit, Pipe, PipeTransform} from '@angular/core';
import * as firebase from "firebase";
import Query = firebase.database.Query;
import {FirebaseQM} from "../../firestore-cfg/firebaseQueryManager";
import {Firestore} from "../../firestore-cfg/firestore";
import {ContainerViewService} from "../container-view/container-view.service";
import {ShowcaseService} from "./showcase-service";
import { Subscription } from 'rxjs/Rx';
import {SearchFilter} from "./showcase.component";
import {BOOM_OUT_ANIMATION} from "../../animations/boom-out.animation";



@NgModule({
  declarations: [SearchFilter]})
@Component({
  selector: 'app-showcase-favorite',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css'],
  animations: [ BOOM_OUT_ANIMATION ]
})
@Injectable()
export class ShowcaseFavoriteComponent implements OnInit, OnDestroy {
  private fs: Firestore;
  private filter: object;
  private qm: FirebaseQM;
  insertions = [];
  public completed: boolean;
  private fb: firebase.app.App;
  private user;
  haNoItems;
  numCol;
  rowHeight;
  mobile;
  isValidated = true;
  _subscription: Subscription;
  state: string = 'active';
  constructor( public containerViewService: ContainerViewService, public showcaseService: ShowcaseService ) {
    this.fs = new Firestore();
    this.fb = this.fs.getConfiguredFirebase();
    this.qm = new FirebaseQM();

    this.completed = false;

    this.showcaseService.set(
      {checked: [], disabled: true}
    );

    // User screen size
    const screenHeight = window.screen.height;
    const screenWidth = window.screen.width;

    if (screenWidth <= 1024) {
      this.numCol = 2;
      this.rowHeight = '270px';
      this.mobile = true;

      if (screenWidth < 768) {
        this.rowHeight = '190px';
      }

    } else {
      this.numCol = 4;
      this.rowHeight = '270px';
      this.mobile = false;
    }

    this._subscription = this.showcaseService.filter.subscribe((value) => {
      this.filter = value;
      if (this.user) {
        this.combineInsetions();
      }
    });

    console.log(this._subscription)
  }

  ngOnInit() {
    let self = this;

    this.fb.auth().onAuthStateChanged( function( user ) {
      {
        self.user = user;
        self.combineInsetions();
      }
    });


  }


  public combineInsetions() {

    const self = this;

    // Init view
    self.insertions = [];
    this.completed = false;
    self.haNoItems = true;

    const ref = this.qm.getReference( 'Favorite' );
    const groupRef = this.qm.getReference( 'Insertion' );

    const disabled = self.filter['disabled'];
    const checked = self.filter['checked'];

    let query: Query = ref.child(self.user['uid']);

    query.once('value').then(function (querySnapshot) {

      const obj: any = [];

      querySnapshot.forEach(function (snapshot) {

        let key = snapshot.child('key').val();
        groupRef.child(key).once('value').then(function ( snapshot1 ) {

          let cat =  snapshot1.child('category').val();

          if (disabled || checked[cat - 1]) {
            self.insertions.push({
              key: snapshot1.child('key').val(),
              datetime: snapshot1.child('datetime').val(),
              category: snapshot1.child('category').val(),
              title: snapshot1.child('title').val(),
              description: snapshot1.child('description').val(),
              image1: snapshot1.child('images').child('image1').val(),
              image3: snapshot1.child('images').child('image2').val(),
              image4: snapshot1.child('images').child('image3').val(),
              image5: snapshot1.child('images').child('image4').val(),
              image6: snapshot1.child('images').child('image5').val(),
              image7: snapshot1.child('images').child('image6').val(),
            });
          }
        });

        self.haNoItems = false;
      });

      self.completed = true;
    });

  }
  sendVerification() {
    this.user.sendEmailVerification();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
