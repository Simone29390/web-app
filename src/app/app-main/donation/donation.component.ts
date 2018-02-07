import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import Query = firebase.database.Query;
import {FirebaseQM} from "../../firestore-cfg/firebaseQueryManager";
import {MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StringUtils} from "../../utility/string.utils";

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
  tooLow;

  constructor( private dialogRef: MatDialogRef<DonationComponent>) {
    this.checked = false;
    this.price = '';
    this.qm = new FirebaseQM();
    this.tooLow = true;
  }

  ngOnInit() {

    this.getRule();


  }

  public close() {
    this.dialogRef.close();
  }

  public pushDonation() {

    if (this.price === null || this.price.length <= 0) {
      alert("Input your offer!");
    }

    if (!this.checked) {
      alert("Check the box!");
    }

    if (this.tooLow ) {
      alert('Your offer is too low!');
    }

    const ref = this.qm.getReference( 'Donation' );


    ref.push().set(
      {
        datetime: 'DEFAULT',
        valueToCompare: this.price * 100,
        value: this.getEurValue(this.price),
        key: this.key,
        userkey: this.userkey,
        state: 'no'
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

    this.tooLow = (this.auctionHigherBidToCompare > value);
  }


  public getRule() {

    const self = this;

    const ref = this.qm.getReference( 'Setting' );

    ref.once('value').then(function (querySnapshot) {

      self.rule = querySnapshot.child('text_rule').val();
    });
  }
}
