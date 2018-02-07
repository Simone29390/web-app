import {Component, OnInit, ViewChild} from '@angular/core';
import {SidenavService} from "../side-menu/sidenave-service";
import {Subscription} from "rxjs/Subscription";
import {MatSidenav} from "@angular/material";

@Component({
  selector: 'app-favorite-view',
  templateUrl: './favorite-view.component.html',
  styleUrls: ['./favorite-view.component.css']
})
export class FavoriteViewComponent implements OnInit {
  isMobile = true;
  @ViewChild( 'sidenav' )
  private sidenav: MatSidenav;
  _subscription: Subscription;
  destination;

  mode;
  public opened: boolean;
  constructor( public sidenavService: SidenavService) {
    // User screen size
    const screenHeight = window.screen.height;
    const screenWidth = window.screen.width;

    if (screenWidth <= 768) {
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
    if (this.isMobile) {
      this.sidenavService.setSidenav( this.sidenav );
    }
  }

}
