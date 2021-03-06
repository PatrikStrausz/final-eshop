import { HeaderComponent } from './../header/header.component';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
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

  productsTitle: ProductModelServer[] = [];

  search: string;

  categories = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private userService: UserServiceService
  ) {}

  ngOnInit() {
    this.productService.currentSearch.subscribe((s) => (this.search = s));

    this.productService.getAllProducts().subscribe((prods) => {
      this.products = prods;
    });

    this.productService.getCategories().subscribe((c) => (this.categories = c));
  }

  updateCategorie(categorie: Categories) {
    if (categorie.title === 'Shoes') {
      this.productService.getCategoriesById(categorie.id).subscribe((c) => {
        this.products = c;
      });
    } else if (categorie.title === 'Electronics') {
      this.productService.getCategoriesById(categorie.id).subscribe((c) => {
        this.products = c;
      });
    }else if (categorie.title === 'Computers') {
      this.productService.getCategoriesById(categorie.id).subscribe((c) => {
        this.products = c;
      });
  }
}

  ss() {
    this.productService.getAllProducts().subscribe((prods) => {
      this.products = prods;
    });
  }

  selectProduct(id: number) {
    this.router.navigate(['/product', id]).then();
  }

  selectCategory(id: number) {
    this.router.navigate(['/', id]).then();
  }

  AddProduct(id: number) {
   
    this.cartService.AddProductToCart(id);
    
  }

  

  

  
}
