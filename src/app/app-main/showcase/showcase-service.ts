import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class ShowcaseService {

  private _filter: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public filter: Observable<any> = this._filter.asObservable();

  public get(): Observable<any> {
    return Observable.of(this.filter);
  }

  public set(obj: object) {
    this._filter.next(obj);
  }
}
