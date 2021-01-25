import { Router } from '@angular/router';
import { SnackbarService } from './../../services/snackbar.service';
import { User } from './../../models/user.model';
import { UserServiceService } from 'src/app/services/user-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.css']

})
export class DeleteProfileComponent implements OnInit {


user:User
  hide = true;

  constructor(private userService:UserServiceService,
    private snackbarService:SnackbarService,
    private router:Router,
    public dialogRef:MatDialogRef<DeleteProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.user = data.data

    }

  ngOnInit(): void {
   
   
  }


  deleteForm = new FormGroup({
     password: new FormControl('')
    
     
  }
  )


  get password(): FormControl {
    return this.deleteForm.get('password') as FormControl;
  }

  onSubmit(){

    const userToDelete = new User("", this.password.value,"",0,"",this.user.id)

    this.userService.deleteUser(userToDelete).subscribe(result => {

     
      localStorage.removeItem("name")
      localStorage.removeItem("token")

     
      this.dialogRef.close()
 
     

    
    }
   )


    

  }

}
