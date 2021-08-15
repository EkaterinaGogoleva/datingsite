import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginformComponent } from './loginform/loginform.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { RegformComponent } from './regform/regform.component';
import { SearchComponent } from './search/search.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  { path: '',   redirectTo: '/start', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'myprofile', component: MyprofileComponent /*, canActivate: [AuthGuard] */ },
  //reform on suojattu LoginGuardilla
  { path: 'regform', component: RegformComponent  },
  { path: 'loginform', component: LoginformComponent },
  { path: 'search', component: SearchComponent /*, canActivate: [AuthGuard] */ },
  { path: 'start', component: StartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
