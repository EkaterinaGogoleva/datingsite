import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
//import { UserService } from '../_services/user.service';
import { ProfileService } from '../_services/profile.service';
import { Profile } from '../profile';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  //content?: string;
  //Tour of heroes
  searchprofiles$!: Observable<Profile[]>;
private searchTerms = new Subject<string>();
  profile!: Profile;
 profiles: any;
  //заменила значение null на any
  currentProfile: any;
  currentIndex = -1;
  usernamepublic='';
  //emailpublic='';
 
  //gender ='';
  

  constructor(//private userService: UserService,
    private ProfileService: ProfileService) { }



  ngOnInit(): void {
    
 //Tour of heroes
    this.searchprofiles$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      //это промежуток времени нужен, чтобы понять какой именно запрос мы вводим "a" или "ab"
      debounceTime(300),

      // ignore new term if same as previous term
      //eсли поисковый запрос не изменился, то новый поиск не осуществляется
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((usernamepublic: string) => this.ProfileService.findByUsername(usernamepublic)),
    );


    //this.retrieveProfiles(); from tutorial 4
    this.retrieveProfiles();
    //tutorial 1
    /*this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );*/
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

setActiveProfile(profile: Profile, index: any): void {
  this.currentProfile = profile;
  this.currentIndex = index;
}
 /*
 searchByUsername(): void {
  this.ProfileService.findByUsername(this.usernamepublic)
    .subscribe(
      data => {
        this.profiles = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
}*/
 //Tour of heroes
searchByUsername(usernamepublic: string): void {
  this.searchTerms.next(usernamepublic);
}

}
