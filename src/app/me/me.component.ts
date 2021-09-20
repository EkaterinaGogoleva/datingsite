/*This Component gets current User from Storage using TokenStorageService 
and show information (username, token, email, roles).*/
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ProfileService } from '../_services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../profile';
import { Location } from '@angular/common'; //нужно чтобы перемещаться на один шаг назад в приложении
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css'],
})
export class MeComponent implements OnInit {
  profile!: Profile[];

  currentUser: any;
  //tutorial 4 Поменяла null на any
  message = '';
  data!: {};
  formData: any;
  usernamepublic!: string;
  email!: string;
  emailpublic!: string;
  gender!: string;
  
  /*navigateToList() {
      this.router.navigate(['profiles']);
    };*/

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
    //this.currentUser = this.token.getUser();
    this.getProfile();
    this.message = '';
  }

  updateProfile(): void {
    this.ProfileService.update(
      this.currentUser.username,
      (this.data = {
        email: this.currentUser.email,
        emailpublic: this.currentUser.emailpublic,
        gender: this.currentUser.gender,
        usernamepublic: this.currentUser.usernamepublic,
      })
    ).subscribe(
      (response) => {
        console.log(response);
        this.message = 'The tutorial was updated successfully!';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteProfile(): void {  
    this.ProfileService.delete(this.currentUser.username)
     .subscribe(() => this.getProfile())
    .add(()=>this.router.navigate(['profiles']))
    }
  }