import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../_services/profile.service';
import { AuthService } from '../_services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  ////добавила, чтобы данные шли в me
  form: any = {
    username: null,
    email: null,
    password: null,
    usernamepublic: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
//tutorial 4
  profile = {
    usernamepublic: '',
    emailpublic: '',
    gender: '',
    published: false
  };
  submitted = false;

  constructor(private profileService: ProfileService,
    private router: Router, 
    private authService: AuthService) { }
   ngOnInit(): void {}

   saveProfile(): void {
    const data = {
      usernamepublic: this.profile.usernamepublic,
      emailpublic: this.profile.emailpublic,
      gender: this.profile.gender,
      published: this.profile.published
    };

    this.profileService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
        
        
        
  }
//добавила, чтобы данные шли в me
  onSubmit(): void {
    const { username, email, password, usernamepublic, emailpublic, gender} = this.form;

    this.authService.register(username, email, password, usernamepublic, emailpublic, gender)
    .subscribe(data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/form'])
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;

      }
    );
  }

  

  newProfile(): void {
    this.submitted = false;
    this.profile = {
      usernamepublic: '',
      emailpublic: '',
      gender: '',
      published: false
    };
  }
  
  
}
