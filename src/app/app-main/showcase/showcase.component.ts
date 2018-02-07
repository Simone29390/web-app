import {Component, Injectable, NgModule, OnDestroy, OnInit} from '@angular/core';
import * as firebase from "firebase";
import Query = firebase.database.Query;
import {FirebaseQM} from "../../firestore-cfg/firebaseQueryManager";
import { Pipe, PipeTransform} from '@angular/core';
import {ShowcaseService} from "./showcase-service";
import { Subscription } from 'rxjs/Rx';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilter implements PipeTransform {
  transform(value: any, args?: any): any {

    if(!value)return null;
    if(!args)return value;

    args = args.toLowerCase();

    return value.filter(function(item){
      return JSON.stringify(item).toLowerCase().includes(args);
    });
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

  constructor( public showcaseService: ShowcaseService ) {
    this.qm = new FirebaseQM();

    this.completed = false;
    this.showcaseService.set(
      {checked: [], disabled: true}
    );

    // User screen size
    const screenHeight = window.screen.height;
    const screenWidth = window.screen.width;

    if (screenWidth <= 768) {
      this.numCol = 2;
      this.rowHeight = '180px';
      this.mobile = true;
    } else {
      this.numCol = 3;
      this.rowHeight = '350px';
      this.mobile = false;
    }

  }

  ngOnInit() {

    this._subscription = this.showcaseService.filter.subscribe((value) => {
      this.filter = value;

      this.combineInsetions();
    });
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

        let cat =  snapshot.child('category').val();

        if (disabled || checked[cat]) {

          obj.push({
            key           : snapshot.child('key').val(),
            datetime      : snapshot.child('datetime').val(),
            category      : snapshot.child('category').val(),
            title         : snapshot.child('title').val(),
            description   : snapshot.child('description').val(),
            image1         : snapshot.child('images').child('image1').val(),
            image3         : snapshot.child('images').child('image2').val(),
            image4         : snapshot.child('images').child('image3').val(),
            image5         : snapshot.child('images').child('image4').val(),
            image6         : snapshot.child('images').child('image5').val(),
            image7         : snapshot.child('images').child('image6').val(),
          });
        }
      });

      self.insertions = obj;
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
