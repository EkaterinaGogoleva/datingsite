import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../_services/profile.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
//tutorial 4
  profile = {
    usernamepublic: '',
    emailpublic: '',
    gender: '',
    published: false
  };
  submitted = false;

  constructor(private profileService: ProfileService) { }
   ngOnInit(): void {}

   saveProfile(): void {
    const data = {
      usernamepublic: this.profile.usernamepublic,
      emailpublic: this.profile.emailpublic,
      gender: this.profile.gender
    };

    this.profileService.create(data)
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
      usernamepublic: '',
      emailpublic: '',
      gender: '',
      published: false
    };
  }
}
