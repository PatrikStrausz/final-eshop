import { SnackbarService } from './../../services/snackbar.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './../../models/user.model';
import { FormGroup, Validators, FormControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {


  user: User;

  hide = true;

editForm = new FormGroup({
  username: new FormControl(''),
  email: new FormControl('', 
  [
   Validators.email,
   Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]),
   password: new FormControl(''),
   phone: new FormControl(''),
   line: new FormControl(''),
   city: new FormControl(''),
   state: new FormControl(''),
   country: new FormControl(''),
   pincode: new FormControl(''),
   
}
)

  constructor(private usersService: UserServiceService,
    private snackbarService:SnackbarService) { }


  get username(): FormControl {
    return this.editForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.editForm.get('password') as FormControl;
  }

  get email(): FormControl {
    return this.editForm.get('email') as FormControl;
  }

  get phone(): FormControl {
    return this.editForm.get('phone') as FormControl;
  }

 
  get line(): FormControl {
    return this.editForm.get('line') as FormControl;
  }

  get city(): FormControl {
    return this.editForm.get('city') as FormControl;
  }

  get state(): FormControl {
    return this.editForm.get('state') as FormControl;
  }

  get country(): FormControl {
    return this.editForm.get('country') as FormControl;
  }
  get pincode(): FormControl {
    return this.editForm.get('pincode') as FormControl;
  }


  ngOnInit(): void {
    this.usersService.getUserByUsername(this.usersService.name).subscribe(u => {
      this.user = u
    })

  }


  onSubmit(){


    const userToSave = new User(
      this.username.value !== null ? this.username.value: this.user.username,
      this.password.value !== null ? this.password.value.trim(): this.user.password,
      this.email.value !== null ? this.email.value: this.user.email,
      undefined,
      undefined,
      this.user.id,
    );


    this.usersService.checkUserConflicts(userToSave).subscribe(result => {

     
      this.snackbarService.successMessage(result.success)
      localStorage.setItem("name", userToSave.username)
      this.usersService.user = userToSave;
      this.usersService.name = userToSave.username;
  
      this.usersService.saveUser(userToSave).subscribe();
  
      location.reload()
    },
    error => {
     
      this.snackbarService.errorMessage("Email or username already exists")
    })

  }



 
    

}
