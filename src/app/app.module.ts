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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
//import { GalleryComponent } from './gallery/gallery.component';

//Tutorial 8
import { MaterialModule } from './material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
//import { MaterialFileInputModule } from 'ngx-material-file-input';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    MeComponent,
    ProfilesComponent,
    LoginComponent,
    ProfileComponent,
   ProfileSearchComponent,
   HomeComponent,
   //GalleryComponent,
   
 
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    //MaterialFileInputModule
    ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
