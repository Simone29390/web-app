import {Component, Input, OnInit} from '@angular/core';
import {FirestoreInsertion} from "../../firestore-cfg/firestore.insertion";
import { FirestoreQM } from "../../firestore-cfg/firestoreQueryManager";
import * as firebase from "firebase";
import Query = firebase.firestore.Query;
import {Firestore} from "../../firestore-cfg/firestore";
import {escapeRegExp} from "tslint/lib/utils";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() insertion: object;
  insertionId: string;
  imagesArray = [];
  primaryImage = '/assets/other/blank.jpg';
  isMobile;
  dateTime;

  private fs: Firestore;
  private fb: firebase.app.App;

  constructor() {
    this.fs = new Firestore();
    this.fb = this.fs.getConfiguredFirebase();

    // User screen size
    const screenHeight = window.screen.height;
    const screenWidth = window.screen.width;

    if (screenWidth <= 1024) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  ngOnInit() {

    let self = this;

    this.insertionId = this.insertion['key'];

    let image = [];

    let res = this.getThumbFromFirebaseStorage(this.insertion['image1']);
    res.getDownloadURL().then(function (url) {
      self.primaryImage = url;
    }).catch(function (error) {
      self.primaryImage = this.insertion['image1'];
    });

    if (!this.isMobile) {

      image[0] = this.insertion['image2'];
      image[1] = this.insertion['image3'];
      image[2] = this.insertion['image4'];
      /*image[3] =  this.insertion['image5'];
      image[4] =  this.insertion['image6'];*/
    }
    for (let i = 0; i < image.length; i++) {
      if (image[i] != null) {

        let res = this.getThumbFromFirebaseStorage(image[i]);
        res.getDownloadURL().then(function (url) {
          self.imagesArray.push(url);
        }).catch(function (error) {
          self.imagesArray.push(image[i]);
        });
      }
    }

    let date = new Date(this.insertion['timeToEnd']).toLocaleDateString();
    let time = new Date(this.insertion['timeToEnd']).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    this.dateTime = "Scade il " + date + " alle " + time;
  }

  getCategoryName(id: string) {
    switch (id) {
      case '1':
        return 'Abbigliamento e accessori';
      case '2':
        return 'Elettrodomestici';
      case '3':
        return 'Film e Libri';
      case '4':
        return 'Infanzia e Bambini';
      case '5':
        return 'Mobili';
      case '6':
        return 'Oggetti da Cucina';
      case '7':
        return 'Oggetti di Arredamento';
      case '8':
        return 'Oggetti Sportivi';
      case '9':
        return 'Altre Categorie';
    }
    return 'Altre Categorie';
  }

  public getThumbFromFirebaseStorage(URL: string) :firebase.storage.Reference {

    let pos = URL.lastIndexOf("?");
    let result = URL.substring(0, pos);
    result = this.replaceAll(result,"https://firebasestorage.googleapis.com/v0/b/appriuso.appspot.com/o/","");
    result = "gs://appriuso.appspot.com/thumb_" + result;

    return this.fb.storage().refFromURL(result);
  }


  public replaceAll(str, find, replace) :string {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  }
}
