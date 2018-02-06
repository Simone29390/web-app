import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material";
import {SidenavService} from "../side-menu/sidenave-service";
import {CategoryPanelService} from "./category-panel-service";
import {ShowcaseComponent} from "../showcase/showcase.component";
import {ShowcaseService} from "../showcase/showcase-service";

@Component({
  selector: 'app-category-panel',
  templateUrl: './category-panel.component.html',
  styleUrls: ['./category-panel.component.css']
})
export class CategoryPanelComponent implements OnInit {
  @ViewChild( 'sidenav' )
  private sidenav: MatSidenav;
  checked: boolean[] = [];
  indeterminate = false;
  align = 'start';
  disabled = false;

  public opened: boolean;

  sequence = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

  constructor(private sidenavService: CategoryPanelService, public showcase: ShowcaseService) {

    this.opened = true;

  }

  ngOnInit() {

    this.sidenavService.setSidenav( this.sidenav );
  }

  public setFilter(): void {
    this.showcase.set(
      {checked: this.checked, disabled: this.disabled}
    );
  }

  getCategoryName(id: string) {
    switch (id) {
      case '0':
        return 'Abbigliamento e accessori';
      case '1':
        return 'Elettrodomestici';
      case '2':
        return 'Film e Libri';
      case '3':
        return 'Infanzia e Bambini';
      case '4':
        return 'Mobili';
      case '5':
        return 'Oggetti da Cucina';
      case '6':
        return 'Oggetti di Arredamento';
      case '7':
        return 'Oggetti Sportivi';
      case '8':
        return 'Altre Categorie';
    }
    return 'Altre Categorie';
  }



}
