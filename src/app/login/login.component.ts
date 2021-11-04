/*Login Component also uses AuthService to work with Observable object.
 Besides that, it calls TokenStorageService methods to check loggedIn 
 status and save Token, User info to Session Storage.
 }
*/
 import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import {Router} from '@angular/router';
import { ProfileService } from '../_services/profile.service';
import { Profile } from '../profile';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;


  constructor( private token: TokenStorageService,
    private router: Router, 
    private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private ProfileService: ProfileService) { 
    this.currentUser = this.token.getUser();
  }
 
  
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
       
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
   
        this.isLoggedIn = true;
 
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  getProfile(): void {
    const username = this.currentUser.username;
    this.ProfileService.findByUsname(username).subscribe(
      (profile: Profile[]) => (this.currentUser = profile)
    );
  }
}
