import { NgModule } from '@angular/core';

// Input imports
import { MatToolbarModule} from '@angular/material';
import { MatMenuModule } from '@angular/material';

@NgModule({
  imports: [ MatToolbarModule, MatMenuModule ],
  exports: [ MatToolbarModule, MatMenuModule ]
})

export class MaterialNavigationModule { }
