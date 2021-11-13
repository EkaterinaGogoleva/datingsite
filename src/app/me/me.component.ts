/*This Component gets current User from Storage using TokenStorageService 
and show information (username, email...).*/
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ProfileService } from '../_services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../profile';
import { Location } from '@angular/common'; //нужно чтобы перемещаться на один шаг назад в приложении


@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css'],
})
export class MeComponent implements OnInit {
  profile!: Profile[];

  currentUser: any;
  //Tutorial 4 Поменяла null на any
  message = '';
  data!: {};
  formData: any;
  nickname!: string;
  email!: string;
  gender!: string;
  date_of_birth!: string; 
  children!: string;
  marital_status!: string; 
  education!: string; 
  profession!: string;
  about_myself!: string;


  constructor(
    private token: TokenStorageService,
    private ProfileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.currentUser = this.token.getUser();
    
  }


  getProfile(): void {
    const username = this.currentUser.username;
    this.ProfileService.findByUsname(username).subscribe(
      (profile: Profile[]) => (this.currentUser = profile)
    );
  }

  ngOnInit(): void {
    this.getProfile();
    this.message = '';
  }

  updateProfile(): void {
    this.ProfileService.update(
      this.currentUser.username,
      (this.data = {
        email: this.currentUser.email,
        gender: this.currentUser.gender,
        nickname: this.currentUser.nickname,
        date_of_birth: this.currentUser.date_of_birth,
         children: this.currentUser.children, 
         marital_status: this.currentUser.marital_status, 
         education: this.currentUser.education, 
         profession: this.currentUser.profession,
        about_myself: this.currentUser.about_myself,

      })
    ).subscribe(
      (response) => {
        console.log(response);
        this.message = 'Profile was updated successfully!';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteProfile(): void {  
    this.ProfileService.delete(this.currentUser.username)
     .subscribe(() => this.getProfile())
    .add(
      ()=>this.router.navigate(['profiles'])); 
    this.message = 'Profile was deleted successfully!';
    }
  }
  