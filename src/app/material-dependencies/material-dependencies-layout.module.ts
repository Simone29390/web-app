import { NgModule } from '@angular/core';

/** Angular Material Form import */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Angular Material Stepper */
import {MatExpansionModule, MatLineModule, MatListModule, MatStepperModule} from '@angular/material';

/** Angular Material Grid List layout */
import { MatGridListModule } from '@angular/material';

@NgModule({
  imports: [ FormsModule, ReactiveFormsModule, MatStepperModule, MatGridListModule, MatExpansionModule, MatListModule, MatLineModule ],
  exports: [ FormsModule, ReactiveFormsModule, MatStepperModule, MatGridListModule, MatExpansionModule, MatListModule, MatLineModule ]
})

export class MaterialLayoutModule { }

