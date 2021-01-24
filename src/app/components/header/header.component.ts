import { Auth } from 'src/app/models/auth';
import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { CartModelServer } from '../../models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: number;
  authState: boolean;
  
  
  activeLogin = '';
  
  constructor(
    public cartService: CartService,
    public userService: UserServiceService
  ) {}



  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe((total) => (this.cartTotal = total));

    this.cartService.cartDataObs$.subscribe((data) => (this.cartData = data));

   this.activeLogin = this.userService.name

    

    this.userService.authState$.subscribe(
      (authState) => (this.authState = authState)
    );
  }

  logout(auth:Auth): void {
    
  localStorage.removeItem('name')
  localStorage.removeItem('token');

    auth = new Auth(this.activeLogin)

 

    this.userService.logout(auth).subscribe();

    location.reload();
}
}
