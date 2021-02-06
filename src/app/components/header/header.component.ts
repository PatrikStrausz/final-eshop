import { User } from 'src/app/models/user.model';

import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from './../../services/snackbar.service';

import { Router } from '@angular/router';
import { Auth } from 'src/app/models/auth';
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
  user: User;

  constructor(
    public cartService: CartService,
    public userService: UserServiceService,
    private router: Router,
    private snackbarService: SnackbarService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe((total) => (this.cartTotal = total));

    this.cartService.cartDataObs$.subscribe((data) => (this.cartData = data));

    this.activeLogin = this.userService.name;

    this.userService.authState$.subscribe(
      (authState) => (this.authState = authState)
    );

    this.userService
      .getUserByUsername(this.activeLogin)
      .subscribe((u) => (this.user = u));
  }

  logout(auth: Auth): void {
    auth = new Auth(this.activeLogin);

    this.userService.logout(auth).subscribe((result) => {
      this.snackbarService.successMessage('User logged out');
    });

    location.reload()
    localStorage.removeItem('name');
    localStorage.removeItem('token');
  }
}
