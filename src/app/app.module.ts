import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthDataService } from './app-core/services/auth-data.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { DweetModule } from './dweet/dweet.module';
import { DweetDataService } from './app-core/services/dweet-data.service';
import { UnAuthorizedComponenet } from './app-shared/components/unauthorized.component';
import { DweeterDataService } from './app-core/services/dweeter-data.service';
import { NotFoundComponent } from './app-shared/components/not-found.component';


@NgModule({
  declarations: [
    AppComponent, UnAuthorizedComponenet, NotFoundComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule, AuthModule, DweetModule, ModalModule.forRoot()
  ],
  providers: [AuthDataService, DweetDataService, DweeterDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
