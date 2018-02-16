import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class ContainerViewService {

  private _numbOfDonationActive: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _numbOfDonationExpired: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _numbOfDonationWon: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _numbOfInsertion: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _numbOfNewestInsertion: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _numbOfLastestInsertion: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public numbOfDonationActive: Observable<any> = this._numbOfDonationActive.asObservable();
  public numbOfDonationExpired: Observable<any> = this._numbOfDonationExpired.asObservable();
  public numbOfDonationWon: Observable<any> = this._numbOfDonationWon.asObservable();
  public numbOfInsertion: Observable<any> = this._numbOfInsertion.asObservable();
  public numbOfNewestInsertion: Observable<any> = this._numbOfNewestInsertion.asObservable();
  public numbOfLastestInsertion: Observable<any> = this._numbOfLastestInsertion.asObservable();

  public getNumbOfDonationActive(): Observable<any> {
    return Observable.of(this.numbOfDonationActive);
  }
  public getNumbOfDonationExpired(): Observable<any> {
    return Observable.of(this.numbOfDonationExpired);
  }
  public getNumbOfDonationWon(): Observable<any> {
    return Observable.of(this.numbOfDonationWon);
  }
  public getNumbOfInsertion(): Observable<any> {
    return Observable.of(this.numbOfInsertion);
  }
  public getNumbOfNewestInsertion(): Observable<any> {
    return Observable.of(this.numbOfNewestInsertion);
  }
  public getNumbOfLastestInsertion(): Observable<any> {
    return Observable.of(this.numbOfLastestInsertion);
  }

  public setNumbOfDonationActive(obj: number) {
    this._numbOfDonationActive.next(obj);
  }
  public setNumbOfDonationExpired(obj: number) {
    this._numbOfDonationExpired.next(obj);
  }
  public setNumbOfDonationWon(obj: number) {
    this._numbOfDonationWon.next(obj);
  }
  public setNumbOfInsertion(obj: number) {
    this._numbOfInsertion.next(obj);
  }
  public setNumbOfNewestInsertion(obj: number) {
    this._numbOfNewestInsertion.next(obj);
  }
  public setNumbOfLastestInsertion(obj: number) {
    this._numbOfLastestInsertion.next(obj);
  }

}
