import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainViewService} from "./main-view-service";
import {Subscription} from "rxjs/Subscription";
import {SidenavService} from "../side-menu/sidenave-service";


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})

export class MainViewComponent implements OnInit, OnDestroy {
  _subscription: Subscription;
  destination;
  isMobile;

  constructor( private mainViewService: MainViewService, private sidenavService: SidenavService) {
    this.mainViewService.select(0);

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
    this._subscription = this.mainViewService.destination.subscribe((value) => {
      this.destination = value;
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
