import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainViewService} from "./main-view-service";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})

export class MainViewComponent implements OnInit, OnDestroy {
  _subscription: Subscription;
  destination;

  constructor( private mainViewService: MainViewService) {
    this.mainViewService.select(0);
  }

  ngOnInit() {
    this._subscription = this.mainViewService.destination.subscribe((value) => {
      this.destination = value;
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
