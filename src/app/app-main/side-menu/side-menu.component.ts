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


  public opened: boolean;

  constructor( private sidenavService: SidenavService) {

    this.opened = true;

  }

  ngOnInit() {
    this.sidenavService.setSidenav( this.sidenav );
  }

}
