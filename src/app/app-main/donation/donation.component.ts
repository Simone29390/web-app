import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import Query = firebase.database.Query;
import {FirebaseQM} from "../../firestore-cfg/firebaseQueryManager";
import {MatDialogRef, MatSnackBar} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StringUtils} from "../../utility/string.utils";
import {Utils} from "../../utility/utils";

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {
  price;
  rule;
  private qm: FirebaseQM;
  checked;
  auctionHigherBidToCompare;
  userkey;
  key;
  isMobile;
  tooLow;
  title;

  constructor( private dialogRef: MatDialogRef<DonationComponent>, public snackBar: MatSnackBar ) {
    this.checked = false;
    this.price = '';
    this.qm = new FirebaseQM();
    this.tooLow = true;

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

    this.getRule();


  }

  public close() {
    this.dialogRef.close();
  }

  public pushDonation() {


    let self = this;

    if (this.price === null || this.price.length <= 0) {
      this.openSnackBar("Prima bisogna inserire un'offerta!","Avviso");
      return;
    }

    if (!this.checked) {
      this.openSnackBar("Devi dare il tuo consenso!","Avviso");
      return;
    }

    if (this.tooLow ) {
      this.openSnackBar("La tua offerta è troppo bassa","Avviso");
      return;
    }

    const ref = this.qm.getReference( 'Donation' );

    let price = this.price * 100;

    ref.push().set(
      {
        datetime: 'DEFAULT_BY_SERVER',
        valueToCompare: price.toString(),
        value: this.getEurValue(this.price),
        key: this.key,
        userkey: this.userkey,
        state: 'no',
        title: this.title
      }
    ).then((snap) => {
        self.close();
    });

  }

  private getEurValue(str: string): string {

    return '€ ' + str + ',00';
  }

  public changeText(newValue) {

    if (newValue < 0) {
      this.price = 0;
    }

    const value = newValue * 100;

    this.tooLow = (this.auctionHigherBidToCompare >= value);
  }


  public getRule() {

    const self = this;

    const ref = this.qm.getReference( 'Setting' );

    ref.once('value').then(function (querySnapshot) {

      self.rule = querySnapshot.child('text_rule').val();
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
