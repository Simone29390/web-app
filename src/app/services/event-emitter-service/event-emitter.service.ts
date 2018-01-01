import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class EventEmitterService {
  private eventEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  /**
   *
   * @param data
   */
  public emitEventEmitter( data: any ): void {
    this.eventEmitter.emit( data );
  }

  /**
   *
   * @returns {EventEmitter<any>}
   */
  public getEventEmitter(): EventEmitter<any> {
    return this.eventEmitter;
  }
}
