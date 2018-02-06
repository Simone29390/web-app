import { NgModule } from '@angular/core';

/** Angular Material Generic import */
import {MatPaginatorModule, MatTableModule} from '@angular/material';

@NgModule({
  imports: [ MatPaginatorModule, MatTableModule ],
  exports: [ MatPaginatorModule, MatTableModule ]
})
export class MaterialDataTableModule { }

