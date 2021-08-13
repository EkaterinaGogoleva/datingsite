import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LogInComponent } from './log-in/log-in.component';
import { LoginformComponent } from './loginform/loginform.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { SearchComponent } from './search/search.component';
import { RegformComponent } from './regform/regform.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LogInComponent,
    LoginformComponent,
    MyprofileComponent,
    SearchComponent,
    RegformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
