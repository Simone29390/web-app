import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {MatTabChangeEvent} from "@angular/material";
import {ContainerViewService} from "./container-view.service";
import {SidenavService} from "../side-menu/sidenave-service";

@Component({
  selector: 'app-container-view',
  templateUrl: './container-view.component.html',
  styleUrls: ['./container-view.component.css']
})
export class ContainerViewComponent implements OnInit, OnDestroy {
  @Input() public viewPage: string;
  subscription: Subscription;
  selectedTab;
  ALL = 'all';
  NEWEST = 'newest';
  LASTEST = 'lastest';
  _donationActive: Subscription;
  _donationExpired: Subscription;
  _donationWon: Subscription;
  _insertion: Subscription;
  _newestInsertion: Subscription;
  _lastestInsertion: Subscription;
  numbOfDonationActive;
  numbOfDonationExpired;
  numbOfDonationWon;
  numbOfInsertion;
  numbOfNewestInsertion;
  numbOfLastestInsertion;


  constructor( private activatedRoute: ActivatedRoute, private router: Router, private containerViewService: ContainerViewService) { }

  ngOnInit() {
    let self = this;

    self.subscription = self.activatedRoute.paramMap.subscribe(params => {
      let id = params.get('id');
      self.changeTab(id);
    });


    this._donationActive = this.containerViewService.numbOfDonationActive.subscribe((value) => {
      this.numbOfDonationActive = value;
    });
    this._donationExpired = this.containerViewService.numbOfDonationExpired.subscribe((value) => {
      this.numbOfDonationExpired = value;
    });
    this._donationWon = this.containerViewService.numbOfDonationWon.subscribe((value) => {
      this.numbOfDonationWon = value;
    });
    this._insertion = this.containerViewService.numbOfInsertion.subscribe((value) => {
      this.numbOfInsertion = value;
    });
    this._newestInsertion = this.containerViewService.numbOfNewestInsertion.subscribe((value) => {
      this.numbOfNewestInsertion = value;
    });
    this._lastestInsertion = this.containerViewService.numbOfLastestInsertion.subscribe((value) => {
      this.numbOfLastestInsertion = value;
    });


  }

  changeTab(id: any) {
    this.selectedTab = id -1;
    if (this.selectedTab >= 4) this.selectedTab = 0;
  }

  onLinkClick(event: MatTabChangeEvent) {

    let index = event.index+1;
    if (this.viewPage == 'donation') {
      this.router.navigate(['donation/' + index]);
    }

  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
    this._donationActive.unsubscribe();
    this._donationExpired.unsubscribe();
    this._donationWon.unsubscribe();
    this._insertion.unsubscribe();
    this._newestInsertion.unsubscribe();
    this._lastestInsertion.unsubscribe();
  }

}
