import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {content?: string;
 
  constructor(private router: Router, private userService: UserService) { 

  }


  ngOnInit(): void {
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  onSubmit(): void {
    
  }
}
