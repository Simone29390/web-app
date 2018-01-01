import { NgModule } from '@angular/core';

/** Includes sub material components dependencies */
import { MaterialGeneralModule } from './material-dependencies-button-indicators.module'
import { MaterialFormControlsModule } from './material-dependencies-form-controls.module'
import { MaterialLayoutModule } from './material-dependencies-layout.module'
import { MaterialNavigationModule } from './material-dependencies-navigation.module'
import { MaterialPopupModalModule } from './material-dependencies-popup-modals.module'
import {MaterialDataTableModule} from "./material-dependencies-data-table.module";

@NgModule({
  imports: [ MaterialGeneralModule, MaterialFormControlsModule, MaterialLayoutModule, MaterialNavigationModule, MaterialPopupModalModule, MaterialDataTableModule ],
  exports: [ MaterialGeneralModule, MaterialFormControlsModule, MaterialLayoutModule, MaterialNavigationModule, MaterialPopupModalModule, MaterialDataTableModule ]
})
export class MaterialDependenciesModule { }

