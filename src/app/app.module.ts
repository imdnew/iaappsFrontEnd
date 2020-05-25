
import { environment } from './../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { COMPONENTS } from './components';
import { ENTRY_COMPONENTS } from './components';
import { PAGES } from './modules';

import { STATES } from './states';

import { ErrorHandlerProvider } from './action-handlers/error.handler';
import { RouteHandlerProvider } from './action-handlers/route.handler';

import { AppComponent } from './app.component';
import { NgbdSortableHeader } from './directives/sortable.directive';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PAGES,
    // === MITTE : Directives
    NgbdSortableHeader,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([
      ...STATES
    ], { developmentMode: !environment.production }),
    NgxsDispatchPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
      name: 'iApps2020DDM'
    }),
    ReactiveFormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS
  ],
  providers: [
    RouteHandlerProvider,
    ErrorHandlerProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
