import { NgModule } from '@angular/core';

// Input imports
import {MatSidenavModule, MatToolbarModule} from '@angular/material';
import { MatMenuModule } from '@angular/material';

@NgModule({
  imports: [ MatToolbarModule, MatMenuModule, MatSidenavModule ],
  exports: [ MatToolbarModule, MatMenuModule, MatSidenavModule ]
})

export class MaterialNavigationModule { }
