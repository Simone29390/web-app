import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MainViewService} from "./main-view-service";
import {Subscription} from "rxjs/Subscription";
import {SidenavService} from "../side-menu/sidenave-service";
import {MatSidenav} from "@angular/material";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls:['./main-view.component.css']
})

export class MainViewComponent implements OnInit, OnDestroy {
  isMobile = true;
  @ViewChild( 'sidenav' )
  private sidenav: MatSidenav;
  _subscription: Subscription;
  destination;
  viewPage = 'home';
  mode;
  public opened: boolean;

  constructor( private mainViewService: MainViewService, public sidenavService: SidenavService) {
    this.mainViewService.select(0);

    // User screen size
    const screenHeight = window.screen.height;
    const screenWidth = window.screen.width;

    if (screenWidth <= 1024) {
      this.opened = false;
      this.mode = 'over';
      this.isMobile = true;
    } else {
      this.opened = true;
      this.mode = 'side';
      this.isMobile = false;
    }


  }

  ngOnInit() {
    this._subscription = this.mainViewService.destination.subscribe((value) => {
      this.destination = value;
    });

    if (this.isMobile) {
      this.sidenavService.setSidenav( this.sidenav );
    }














  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
