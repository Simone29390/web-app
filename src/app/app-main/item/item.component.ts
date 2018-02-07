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
  imagesArray = [];
  primaryImage;
  isMobile;

  constructor() {

    // User screen size
    const screenHeight = window.screen.height;
    const screenWidth = window.screen.width;

    if (screenWidth <= 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  ngOnInit() {
    this.insertionId = this.insertion['key'];

    let image = [];
    this.primaryImage = this.insertion['image1'];

    if (!this.isMobile) {

      image[0] = this.insertion['image2'];
      image[1] = this.insertion['image3'];
      image[2] = this.insertion['image4'];
      /*image[3] =  this.insertion['image5'];
      image[4] =  this.insertion['image6'];*/
    }
    for (let i = 0; i < image.length; i++) {
      if (image[i] != null) {
        this.imagesArray.push(image[i]);
      }
    }
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
