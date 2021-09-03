import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../_services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import{Profile} from '../profile'
import { Location } from '@angular/common'; //нужно чтобы перемещаться на один шаг назад в приложении
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: Profile;
  currentProfile: any;
  message = '';
  constructor(
    private ProfileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { } 
   

  ngOnInit(): void {
    this.message = '';
    this.getProfile(this.route.snapshot.paramMap.get('id'));
  }
  getProfile(id: any): void {
    this.ProfileService.get(id)
      .subscribe(
        data => {
          this.currentProfile = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: any): void {
    const data = {
      username: this.currentProfile.username,
      email: this.currentProfile.email,
      usernamepublic: this.currentProfile.usernamepublic,
      emailpublic: this.currentProfile.emailpublic,
      gender: this.currentProfile.gender,
      published: status
    };

    this.ProfileService.update(this.currentProfile.id, data)
      .subscribe(
        response => {
          this.currentProfile.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateProfile(): void {
    this.ProfileService.update(this.currentProfile.id, this.currentProfile)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The profile was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteProfile(): void {
    this.ProfileService.delete(this.currentProfile.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/profiles']);
        },
        error => {
          console.log(error);
        });
  }
  //методика, с помощью которой идем на шаг назад
 //метод взят из библиотеки ангулар import { Location } from '@angular/common'
  goBack(): void {
    this.location.back();
    }
}
