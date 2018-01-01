import {Component, Input, OnInit} from '@angular/core';
import {FirestoreInsertion} from "../../firestore-cfg/firestore.insertion";
import { FirestoreQM } from "../../firestore-cfg/firestoreQueryManager";
import * as firebase from "firebase";
import Query = firebase.firestore.Query;

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() insertion: FirestoreInsertion;
  public userProfileImage: string;
  public userFirstName: string;
  public userLastName: string;
  public userName: string;
  public userPhone: string;
  private qm: FirestoreQM;

  constructor() {
    this.qm = new FirestoreQM();
  }

  ngOnInit() {
    let self = this;

    let query: Query = this.qm.getRefQuery( 'users', new Array({
      filter: 'uid',
      comparison: '==',
      value: self.insertion.uid
    }) );

    query.get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          self.userProfileImage = doc.data()['photoURL'];
          self.userFirstName = doc.data()['firstName'];
          self.userLastName = doc.data()['lastName'];
          self.userName = self.userFirstName + ' ' + self.userLastName;
          self.userPhone = doc.data()['phoneNumber'];
        });
      });
  }

  getCategoryName(id: string) {
    switch (id) {
      case '0':
        return 'Computers & Mobile Phone';
      case '1':
        return 'Clothing';
      case '2':
        return 'Sports equipment';
      case '3':
        return 'Kitchen utensils';
      case '4':
        return 'House & Garden';
      case '5':
        return 'Animals & Accessories';
      case '6':
        return 'Comics and Newspapers';
      case '7':
        return 'Collectibles';
      case '8':
        return 'Other Categories';
    }
    return 'Other Categories';
  }
}
