import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MeComponent } from './me/me.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
//import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'me/username/:username', component: MeComponent },
  //tutorial 3
  { path: 'profiles/username/:nickname', component: ProfileComponent },
  { path: 'profiles', component: ProfilesComponent },
  { path: '', component: HomeComponent },
//Для загрузки фоток
 // {path: 'gallery', component: GalleryComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
