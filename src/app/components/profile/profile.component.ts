import { DeleteProfileComponent } from './../delete-profile/delete-profile.component';
import { EditProfileComponent } from './../edit-profile/edit-profile.component';
import { Address } from './../../models/address.model';
import { User } from './../../models/user.model';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {  UserServiceService } from 'src/app/services/user-service.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  activeLogin:string;

  address:Address

  userId:number


  constructor(
              private userService: UserServiceService,
              private router: Router,
              public dialog: MatDialog) {
  }





  ngOnInit(): void {

    this.activeLogin = this.userService.name

 
    this.userService.getUserByUsername(this.activeLogin).subscribe(u =>
       {this.user = u,
      localStorage.setItem("id", u.id.toString())}
      )

      


        

      setTimeout(()=>{                       
      
        this.userService.getAddressByUserId(this.user.id).subscribe(a => this.address = a)

   }, 150);
  


  }




  deleteProfile(user:User){
  

    let dialogRef = this.dialog.open(DeleteProfileComponent, {
      height: '250px',
      width: '600px',
      data:{
        data: user
      }
    });
  }

  editProfile(){
    let dialogRef = this.dialog.open(EditProfileComponent, {
      height: '730px',
      width: '600px',
    }).afterClosed().subscribe(_a => this.refresh());
  }

  refresh(){

    this.userService.getAddressByUserId(this.user.id).subscribe(a => this.address = a)


  }
}
