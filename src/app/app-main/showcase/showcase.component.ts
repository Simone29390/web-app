import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {FirestoreInsertion} from "../../firestore-cfg/firestore.insertion";

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {
  iCollection: AngularFirestoreCollection<FirestoreInsertion>;
  insertions: Observable<FirestoreInsertion[]>;

  constructor( private firestore: AngularFirestore ) {
    this.iCollection = this.firestore.collection<FirestoreInsertion>(
      'insertions',
      ref => ref.orderBy('datetime', 'desc')
    );

    this.insertions = this.iCollection.valueChanges();
  }

  ngOnInit() {
  }

}
