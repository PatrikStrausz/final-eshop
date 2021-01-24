


import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Auth } from 'src/app/models/auth';
import { UserServiceService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  auth = new Auth();
  
  constructor( private router: Router,
    private userService:UserServiceService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.auth)
    this.userService.login(this.auth).subscribe();

    
    
  }
  
}
