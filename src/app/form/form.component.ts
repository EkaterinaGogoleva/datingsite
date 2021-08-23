import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Profile } from '../profile';
import { ProfileService } from '../_services/profile.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
 
  

  constructor(private router: Router) { 
   
  }


  ngOnInit(): void {
   
  }
// kontakti serverille
  onSubmit(): void {
    
  }
}
