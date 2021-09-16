import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../_services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import{Profile} from '../profile'

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
    ) { } 
   

  ngOnInit(): void {
   // this.message = '';
    this.getProfile();
  }

  getProfile(): void {
    const usernamepublic = String(this.route.snapshot.paramMap.get('usernamepublic'));
    this.ProfileService.findByUsername(usernamepublic)
      .subscribe(profile => this.profile = profile);
  }

}


