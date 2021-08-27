/*This Component gets current User from Storage using TokenStorageService 
and show information (username, token, email, roles).*/
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ProfileService } from '../_services/profile.service';
//ActivatedRouteSnapshot добавила сама
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  private route: ActivatedRouteSnapshot;
  //currentUser from tutorial 1
  currentUser: any;
  //tutorial 4 Поменяла null на any
  currentProfile:any;
  message='';

  constructor(private token: TokenStorageService,
    private profileService: ProfileService,
    private router: Router,
    //добавила сама
    activatedRoute: ActivatedRoute) { 
      this.route = activatedRoute.snapshot;
    }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.message = '';
    //было this.route.shapshot.paramMap.get('id')
    this.getProfile(this.route.paramMap.get('id'));
  }
  getProfile(id: any): void {
    this.profileService.get(id)
      .subscribe(
        data => {
          this.currentProfile = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
//убрала  updatePublished
  
  updateProfile(): void {
    this.profileService.update(this.currentProfile.id, this.currentProfile)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The tutorial was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteProfile(): void {
    this.profileService.delete(this.currentProfile.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/user']);
        },
        error => {
          console.log(error);
        });
  }
}

