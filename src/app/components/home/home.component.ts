import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductModelServer, serverResponse } from '../../models/product.model';

import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Categories } from 'src/app/models/categories.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: ProductModelServer[] = [];

  

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(prods => {
      this.products =  prods;
      console.log(prods);
    });

   
    


  }

  selectProduct(id: number) {
    this.router.navigate(['/product', id]).then();
  }

  selectCategory(id: number) {
    this.router.navigate(['/', id]).then();
  }


  AddProduct(id: number) {
  
    this.cartService.AddProductToCart(id)
  }

  
}
