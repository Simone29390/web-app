import {EventEmitter, Injectable, Output} from '@angular/core';
import { MatSidenav } from '@angular/material';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SidenavService {
  private _flags: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public flags: Observable<any> = this._flags.asObservable();
  public flag1 = false;
  private sidenav: MatSidenav;

  public setSidenav(sidenav: MatSidenav) {

    this.sidenav = sidenav;
  }

  public open() {
    this._flags.next(true);
    this.flag1 = true;
    return this.sidenav.open();

  }

  public get(): Observable<any> {
    return Observable.of(this.flags);
  }

  public close() {
    this.flag1 = false;
    this._flags.next(false);
    return this.sidenav.close();
  }

  public toggle(): void {
    this.flag1 = !this.flag1;
    this._flags.next(this.flag1);
    this.sidenav.toggle();
  }
}
