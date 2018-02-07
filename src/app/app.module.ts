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
import {SearchFilter, ShowcaseComponent} from './app-main/showcase/showcase.component';
import { ItemComponent } from './app-main/item/item.component';
import { InputComponent } from './app-main/input/input.component';
import {firebase} from "../environments/firebase";
import { SideMenuComponent } from './app-main/side-menu/side-menu.component';
import {SidenavService} from "./app-main/side-menu/sidenave-service";
import { InsertionDetailsComponent } from './app-main/insertion-details/insertion-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AgmCoreModule } from '@agm/core';
import { CategoryPanelComponent } from './app-main/category-panel/category-panel.component';
import {CategoryPanelService} from "./app-main/category-panel/category-panel-service";
import {ShowcaseService} from "./app-main/showcase/showcase-service";
import { LikeComponent } from './app-main/like/like.component';
import {MainViewService} from "./app-main/main-view/main-view-service";
import { ShowcaseFavoriteComponent } from './app-main/showcase/showcase-favorite.component';
import { FavoriteViewComponent } from './app-main/favorite-view/favorite-view.component';
import { DonationViewComponent } from './app-main/donation-view/donation-view.component';
import { DonationComponent } from './app-main/donation/donation.component';
import { ShowcaseActiveComponent } from './app-main/showcase/showcase-active.component';
import { ShowcaseExpiredComponent } from './app-main/showcase/showcase-expired.component';
import { ShowcaseWonComponent } from './app-main/showcase/showcase-won.component';
import { HistoryDonationsComponent } from './app-main/history-donations/history-donations.component';
import {HistoryDonationService} from "./app-main/history-donations/history-donation.service";


@NgModule({
  declarations: [
    AppComponent,
    RegistrationStepperComponent,
    ToolbarComponent,
    RegistrationDialogComponent,
    MainViewComponent,
    ShowcaseComponent,
    ItemComponent,
    InputComponent,
    SideMenuComponent,
    InsertionDetailsComponent,
    NotFoundComponent,
    SearchFilter,
    CategoryPanelComponent,
    LikeComponent,
    ShowcaseFavoriteComponent,
    FavoriteViewComponent,
    DonationViewComponent,
    DonationComponent,
    ShowcaseActiveComponent,
    ShowcaseExpiredComponent,
    ShowcaseWonComponent,
    HistoryDonationsComponent
  ],
  imports: [
    RoutingModule,
    BrowserModule, MaterialDependenciesModule, BrowserAnimationsModule, HttpModule,
    AngularFireModule.initializeApp(firebase.firebase),
    AngularFirestoreModule.enablePersistence(),
    MomentModule,
    DndModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCt__SEyx4mW-r0n8neNFVj0lQN0LWBCdc'
    })
  ],
  entryComponents: [ RegistrationDialogComponent, DonationComponent],
  providers: [
    AngularFireDatabaseProvider,
    EventEmitterService,
    LoginActivate,
    UploadFileService,
    FileUploadService,
    MessagesHandlerService,
    SidenavService,
    CategoryPanelService,
    ShowcaseService,
    MainViewService,
    HistoryDonationService

  ],
  bootstrap: [ ToolbarComponent, RouteComponent  ]
})

export class AppModule { }

