import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ProfileService } from '../_services/profile.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  content?: string;

  profiles: any;
  //заменила значение null на any
  currentProfile: any;
  currentIndex = -1;
  username= '';
  email='';
  emailpublic='';
  usernamepublic= '';
  gender ='';
  

  constructor(private userService: UserService,
    private ProfileService: ProfileService) { }

  ngOnInit(): void {
    //this.retrieveProfiles(); from tutorial 4
    this.retrieveProfiles();
    //tutorial 1
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

//tutorial 4
retrieveProfiles(): void {
  this.ProfileService.getAll()
    .subscribe(
      data => {
        this.profiles = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
}

refreshList(): void {
  this.retrieveProfiles();
  this.currentProfile = null;
  this.currentIndex = -1;
}

setActiveProfile(profile: any, index: any): void {
  this.currentProfile = profile;
  this.currentIndex = index;
}
 //cюда дополнить по другим критериям
 //https://www.bezkoder.com/angular-10-crud-app/

 searchByUsername(): void {
  this.ProfileService.findByUsername(this.username)
    .subscribe(
      data => {
        this.profiles = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
}
}
