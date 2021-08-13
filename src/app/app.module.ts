import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component'
import { LoginformComponent } from './loginform/loginform.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { SearchComponent } from './search/search.component';
import { RegformComponent } from './regform/regform.component';
import { StartComponent } from './start/start.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginformComponent,
    MyprofileComponent,
    SearchComponent,
    RegformComponent,
    StartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
