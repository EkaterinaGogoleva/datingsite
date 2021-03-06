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
    nickname: null,
    gender: null,
    date_of_birth: null,
    children: null,
    marital_status: null,
    education: null,
    profession: null,
    about_myself: null,

  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private router: Router, 
    private authService: AuthService) { }
    
    

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, password, nickname, gender, date_of_birth, children, marital_status, education, profession,
      about_myself
      } = this.form;

    this.authService.register(username, email, password, nickname, gender, date_of_birth, children, marital_status, education, profession,
      about_myself
      )
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
