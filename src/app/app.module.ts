import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
/**
 * Material Module
 * This module contains all ngMaterial dependencies. All mat dependencies will be added here.
 */
import {MaterialDependenciesModule} from './material-dependencies/material-dependencies.module';

import {FileUploadService} from "./services/file-upload/file-upload.service";
import {MessagesHandlerService} from "./services/error-handler/messages-handler.service";
import {AppComponent} from './app.component';
import {RegistrationStepperComponent} from './registration-stepper/registration-stepper.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {RegistrationDialogComponent} from './registration-dialog/registration-dialog.component';
import {HttpModule} from '@angular/http';
import {AngularFireDatabaseProvider} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {UploadFileService} from './utility/upload/fileupload.service';
import {MomentModule} from 'angular2-moment';
import {MainViewComponent} from './app-main/main-view/main-view.component';
import {EventEmitterService} from './services/event-emitter-service/event-emitter.service';
import {DndModule} from "ng2-dnd";
import {LoginActivate} from "./login.activate";
import {RoutingModule} from "./app.route/app.route.module";
import {RouteComponent} from "./app.route/route/route.component";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import { ShowcaseComponent } from './app-main/showcase/showcase.component';
import { ItemComponent } from './app-main/item/item.component';
import { InputComponent } from './app-main/input/input.component';
import {firebase} from "../environments/firebase";


@NgModule({
  declarations: [
    AppComponent,
    RegistrationStepperComponent,
    ToolbarComponent,
    RegistrationDialogComponent,
    MainViewComponent,
    ShowcaseComponent,
    ItemComponent,
    InputComponent
  ],
  imports: [
    RoutingModule,
    BrowserModule, MaterialDependenciesModule, BrowserAnimationsModule, HttpModule,
    AngularFireModule.initializeApp(firebase.firebase),
    AngularFirestoreModule,
    MomentModule,
    DndModule.forRoot()
  ],
  entryComponents: [ RegistrationDialogComponent, ],
  providers: [ AngularFireDatabaseProvider, EventEmitterService, LoginActivate, UploadFileService, FileUploadService, MessagesHandlerService ],
  bootstrap: [ ToolbarComponent, RouteComponent  ]
})

export class AppModule { }

platformBrowserDynamic().bootstrapModule( AppModule );
