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
 
  constructor(
    private ProfileService: ProfileService,
    private route: ActivatedRoute,
    //private router: Router,
    private location: Location    ) { } 
   

  ngOnInit(): void {
   // this.message = '';
    this.getProfile();
  }

  getProfile(): void {
    const usernamepublic = String(this.route.snapshot.paramMap.get('usernamepublic'));
    this.ProfileService.findByUsername(usernamepublic)
      .subscribe(profile => this.profile = profile);
  }

  //методика, с помощью которой идем на шаг назад
 //метод взят из библиотеки ангулар import { Location } from '@angular/common'
  goBack(): void {
    this.location.back();
    }
}


