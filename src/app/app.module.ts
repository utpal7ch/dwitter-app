import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthDataService } from './core/services/auth-data.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { DweetModule } from './dweet/dweet.module';
import { DweetDataService } from './core/services/dweet-data.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule, AuthModule, DweetModule
  ],
  providers: [AuthDataService, DweetDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
