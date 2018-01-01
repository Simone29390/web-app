import { NgModule } from '@angular/core';

// Input imports
import {MatInputModule, MatSelectModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material'
import { MatRadioModule } from '@angular/material'
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material'

@NgModule({
  imports: [ MatInputModule, MatFormFieldModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule ],
  exports: [ MatInputModule, MatFormFieldModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule ]
})
export class MaterialFormControlsModule { }

