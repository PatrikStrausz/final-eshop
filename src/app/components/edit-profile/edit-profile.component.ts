import { Address } from './../../models/address.model';
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

  address:Address

editForm = new FormGroup({
  username: new FormControl('',Validators.minLength(3)),
  email: new FormControl('', 
  [
   Validators.email,
   Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]),
   password: new FormControl(''),
   phone: new FormControl('',Validators.minLength(12)),
   line: new FormControl(''),
   city: new FormControl(''),
   state: new FormControl(''),
   country: new FormControl(''),
   pincode: new FormControl('',Validators.minLength(4))
   
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


    setTimeout(()=>{     

    this.usersService.getAddressByUserId(this.user.id).subscribe(a => this.address = a)

  
  }, 200);


    setTimeout(()=>{                       
      


      this.username.setValue(this.user.username)
      this.password.setValue("******")
      this.email.setValue(this.user.email)
      this.phone.setValue(this.address.phone)
      this.line.setValue(this.address.line1)
      this.city.setValue(this.address.city)
      this.state.setValue(this.address.state)
      this.country.setValue(this.address.country)
      this.pincode.setValue(this.address.pincode)

   

 }, 300);

  }


  onSubmit(){


    const userToSave = new User(
      this.username.value !== '' ? this.username.value: this.user.username,
      this.password.value !== '' ? this.password.value.trim(): this.user.password,
      this.email.value !== '' ? this.email.value: this.user.email,
      undefined,
      undefined,
      this.user.id,
    );


    const addressToSave = new Address(
      this.line.value === ''? this.address.line1: this.line.value,
      this.city.value === ''? this.address.city: this.city.value,
      this.state.value=== ''? this.address.state: this.state.value,
      this.country.value=== ''? this.address.country: this.country.value,
      this.phone.value=== ''? this.address.phone: this.phone.value,
      this.pincode.value=== ''? this.address.pincode: this.pincode.value,
      this.user.id
    )



    this.usersService.checkUserConflicts(userToSave).subscribe(result => {

     
      this.snackbarService.successMessage(result.success)
      localStorage.setItem("name", userToSave.username)
      this.usersService.user = userToSave;
      this.usersService.name = userToSave.username;
  
      this.usersService.saveUser(userToSave).subscribe();

      this.usersService.updateAddress(addressToSave).subscribe()

  
     
    },
    error => {
     
      this.snackbarService.errorMessage("Email or username already exists")
    })

  }


  



 
    

}
