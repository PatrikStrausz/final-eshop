import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartModelServer } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartTotal: number;
  cartData: CartModelServer;
  user_id;

  user :User

  activeLogin:string;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {

    this.activeLogin = this.userService.name

    this.userService.getUserByUsername(this.activeLogin).subscribe(u => this.user = u)
    this.cartService.cartDataObs$.subscribe((data) => (this.cartData = data));
    this.cartService.cartTotal$.subscribe((total) => (this.cartTotal = total));
   
  }

  onCheckout() {
    if (this.cartTotal > 0) {
      this.spinner.show();
      this.cartService.CheckoutFromCart(this.user.id);
    } else {
      return;
    }
  }
}
