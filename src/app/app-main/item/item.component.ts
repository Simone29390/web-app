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
  @Input() insertion: object;
  insertionId: string;

  constructor() {
  }

  ngOnInit() {
    this.insertionId = this.insertion['key'];
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
}
