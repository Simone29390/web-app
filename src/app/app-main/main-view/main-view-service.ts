import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class MainViewService {

  private _destination: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public destination: Observable<any> = this._destination.asObservable();

  public get(): Observable<any> {
    return Observable.of(this.destination);
  }

  public select(id: number) {
    switch (id) {
      case 0:
        this._destination.next('home');
        break;
      case 1:
        this._destination.next('favorite');
        break;
      case 2:
        this._destination.next('donation');
        break;
    }
  }
}
