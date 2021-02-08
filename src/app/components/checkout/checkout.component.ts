import { Order } from './../../models/order.model';
import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartModelServer } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ThrowStmt } from '@angular/compiler';

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

  order:Order

  username:string

  activeLogin:string;

  toggleBool: boolean=true;


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
    this.username = localStorage.getItem("name")
  
      const orderToSave = new Order("",this.username,this.cartService.cartTotal$.getValue(),false)

    if (this.cartTotal > 0) {
      this.spinner.show();
      this.cartService.CheckoutFromCart(this.user.id, orderToSave, this.username);
    } else {
      return;
    }
  }

  changeEvent(event) {
    if (event.target.checked) {
        this.toggleBool= false;
    }
    else {
        this.toggleBool= true;
    }
}
}
