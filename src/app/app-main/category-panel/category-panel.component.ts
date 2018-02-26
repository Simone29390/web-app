import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav, MatSnackBar} from "@angular/material";
import {SidenavService} from "../side-menu/sidenave-service";
import {CategoryPanelService} from "./category-panel-service";
import {ShowcaseComponent} from "../showcase/showcase.component";
import {ShowcaseService} from "../showcase/showcase-service";
import {BOOM_OUT_ANIMATION} from "../../animations/boom-out.animation";

export interface DatePickerFilter {
  dateStart: Date,
  dateEnd: Date
}

@Component({
  selector: 'app-category-panel',
  templateUrl: './category-panel.component.html',
  styleUrls: ['./category-panel.component.css'],
  animations: [ BOOM_OUT_ANIMATION ]
})
export class CategoryPanelComponent implements OnInit {
  @ViewChild( 'sidenav' )
  private sidenav: MatSidenav;
  checked: boolean[] = [];
  indeterminate = false;
  align = 'start';
  disabled = false;
  dateFilter = {
    dateStart: "none",
    dateEnd: "none"
  };

  state: string = 'active';

  public opened: boolean;

  sequence = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

  constructor(
    private sidenavService: CategoryPanelService,
    public showcase: ShowcaseService,
    public snackBar: MatSnackBar) {

    this.opened = true;

  }

  ngOnInit() {

    this.sidenavService.setSidenav( this.sidenav );
  }

  public setFilter(): void {

    let bool = true;
    for (let i=0; i<this.checked.length; i++) {
      if (this.checked[i]) bool = false;
    }

    if (bool && !this.disabled) {

      this.openSnackBar("Devi selezionare dei filtri!","Avviso");

      return;
    }

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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
