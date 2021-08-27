import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { ProfileService } from '../_services/profile.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
//tutorial 4
  profile = {
    gender: ''
  };
  submitted = false;

  constructor(private profileService: ProfileService) { }
   ngOnInit(): void {}

   saveProfile(): void {
    const data = {
      gender: this.profile.gender
    };

    this.profileService.addProfile(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newProfile(): void {
    this.submitted = false;
    this.profile = {
      gender: ''
    };
  }

}
