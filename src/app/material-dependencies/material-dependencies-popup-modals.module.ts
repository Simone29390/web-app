import { NgModule } from '@angular/core';

/** Angular Material Generic import */
import { MatTooltipModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  imports: [ MatTooltipModule, MatDialogModule, MatSnackBarModule ],
  exports: [ MatTooltipModule, MatDialogModule, MatSnackBarModule ]
})
export class MaterialPopupModalModule { }

