import { NgModule } from '@angular/core';

/** Angular Material Generic import */
import { MatPaginatorModule } from '@angular/material';

@NgModule({
  imports: [ MatPaginatorModule ],
  exports: [ MatPaginatorModule ]
})
export class MaterialDataTableModule { }

