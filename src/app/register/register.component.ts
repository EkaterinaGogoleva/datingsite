/*
This component binds form data (username, email, password) from template 
to AuthService.register() method that returns an Observable object.
*/
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { GalleryService } from '../_services/gallery.service';
import {Router} from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

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
    foto: null,

  };

/*upload foto
  
onFileSelected(event: any){
  this.foto = event.target.files[0];
 };*/


  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file!: File; // Variable to store file
 // Variable to store file
  

  constructor(private router: Router, 
    private authService: AuthService,
    private galleryService: GalleryService,
    private http: HttpClient) { }
    
    

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, password, nickname, gender, date_of_birth, children, marital_status, education, profession,
      about_myself, foto
      } = this.form;

    this.authService.register(username, email, password, nickname, gender, date_of_birth, children, marital_status, education, profession,
      about_myself, foto
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
//uploading
 // On file Select
 onChange(event:any) {
  this.file = event.target.files[0];
}

// OnClick of button Upload
onUpload() {
  this.loading = !this.loading;
  console.log(this.file);
  this.galleryService.upload(this.file).subscribe(
      (event: any) => {
          if (typeof (event) === 'object') {

              // Short link via api response
              this.shortLink = event.link;

              this.loading = false; // Flag variable 
          }
      }
  );
}
}

