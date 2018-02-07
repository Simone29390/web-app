import {Component, OnInit, ViewChild} from '@angular/core';
import {SidenavService} from "./sidenave-service";
import {MatSidenav} from "@angular/material";
import {MainViewService} from "../main-view/main-view-service";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  @ViewChild( 'sidenav' )
  private sidenav: MatSidenav;
  mode;
  isMobile;


  public opened: boolean;

  constructor( private sidenavService: SidenavService) {


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
    this.sidenavService.setSidenav( this.sidenav );
  }

}
