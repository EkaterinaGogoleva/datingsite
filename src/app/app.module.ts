import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { MeComponent } from './me/me.component';

import { ProfilesComponent } from './profiles/profiles.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSearchComponent } from './profile-search/profile-search.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryDetailsComponent } from './gallery-details/gallery-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//tutorial 8
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    MeComponent,
    ProfilesComponent,
    LoginComponent,
    ProfileComponent,
   ProfileSearchComponent,
   GalleryComponent,
   GalleryDetailsComponent,
   
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
