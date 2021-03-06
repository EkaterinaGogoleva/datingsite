import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../_services/profile.service';
import { Profile } from '../profile';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

 profiles: Profile[] = [];
  
  constructor(private ProfileService: ProfileService) { }


  ngOnInit(): void {
 
  this.getProfiles();
 
  }
  getProfiles(): void {
    this.ProfileService.getAll()
        .subscribe(profiles => this.profiles = profiles);
  }

}
