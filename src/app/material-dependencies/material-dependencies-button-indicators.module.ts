import { NgModule } from '@angular/core';

/** Angular Material Generic import */
import {MatButtonModule, MatCheckboxModule, MatChipsModule} from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';

@NgModule({
  imports: [ MatCardModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule, MatProgressBarModule, MatChipsModule ],
  exports: [ MatCardModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule, MatProgressBarModule, MatChipsModule ]
})
export class MaterialGeneralModule { }

