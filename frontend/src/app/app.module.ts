import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavHeaderComponent } from './components/home/nav-header/nav-header.component';
import { HomeComponent } from './components/home/home.component';
import { ContactListComponent } from './components/home/contacts/contact-list/contact-list.component';
import { ContactCardComponent } from './components/home/contacts/contact-card/contact-card.component';
import { ApiInterceptor } from './interceptors/api.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavHeaderComponent,
    HomeComponent,
    ContactListComponent,
    ContactCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
