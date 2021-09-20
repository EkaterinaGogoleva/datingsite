/*
This component binds form data (username, email, password) from template 
to AuthService.register() method that returns an Observable object.
*/
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    usernamepublic: null,
    emailpublic: null,
    gender: null,
    foto: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private router: Router, 
    private authService: AuthService) { }
    
    

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, password, usernamepublic, emailpublic, gender, foto} = this.form;

    this.authService.register(username, email, password, usernamepublic, emailpublic, gender)
    .subscribe(data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/login'])
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;

      }
    );
  }
}
