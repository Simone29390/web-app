import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material";

@Injectable()
export class MessagesHandlerService {

  constructor( public snackBar: MatSnackBar ) { }

  /**
   * Opens a snackbar with a message and an optional action.
   * @param {string} message The message to show in the snackbar
   * @param {string} action The label for the snackbar action [optional]
   * @param {number} duration Additional duration configuration options for the snackbar
   */
  public openSnackBar( message: string, action?: string, duration?: number ) {
    this.snackBar.open( message, action, {
      duration: duration || 2000
    });
  }
}
