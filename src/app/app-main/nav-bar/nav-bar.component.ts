import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isMobile = true;
  constructor() {
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
  }

}
