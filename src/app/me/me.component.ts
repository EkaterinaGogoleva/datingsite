/*This Component gets current User from Storage using TokenStorageService 
and show information (username, token, email, roles).*/
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ProfileService } from '../_services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import{Profile} from '../profile'
import { Location } from '@angular/common'; //нужно чтобы перемещаться на один шаг назад в приложении
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  profile!: Profile;
  //currentUser from tutorial 1
  currentUser: any;
  //tutorial 4 Поменяла null на any
  message='';
  data!: {};
  //пробую делать чтобы сюда шли данные из формы
  // currentProfile:any;


  constructor(private token: TokenStorageService,
    private ProfileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location   ) {  }

 
  ngOnInit(): void {
    //this.currentUser = this.token.getUser();
    this.currentUser = this.token.getUser();
    this.message = '';
    //пробую сама, чтобы данные из форы шли в "me"
   // this.currentProfile = this.token.getUser();
   //сама написала data, что обновлялись только конкрены поля
  
    //добавила для пробы
   // this.getProfile();
  
  }
  
  //добавила для пробы
 
  getProfile(): void {
    const usernamepublic = String(this.route.snapshot.paramMap.get('usernamepublic'));
    this.ProfileService.findByUsername(usernamepublic)
      .subscribe(profile => this.profile = profile);
  };

  


  updateProfile(): void {
    this.ProfileService.update(this.currentUser.username, this.data = {
      email: this.currentUser.email, 
      emailpublic: this.currentUser.emailpublic,
   gender: this.currentUser.gender,
     usernamepublic: this.currentUser.usernamepublic
      }
    ).subscribe(
        response => {
          console.log(response);
          this.message = 'The tutorial was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteProfile(): void {
    this.ProfileService.delete(this.currentUser.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
        });
  }
}



