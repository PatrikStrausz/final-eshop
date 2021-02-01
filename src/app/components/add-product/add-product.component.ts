import { SnackbarService } from './../../services/snackbar.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {



  editForm = new FormGroup({
    title: new FormControl(''),
    image: new FormControl(''),
    images: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    short_desc: new FormControl(''),
    cat_id: new FormControl('')
  });

  constructor(
    private productService:ProductService,
    private snackbarService:SnackbarService,
    private router:Router,

  ) {
 
  }

  ngOnInit(): void {

    
  }

  get title(): FormControl {
    return this.editForm.get('title') as FormControl;
  }

  get image(): FormControl {
    return this.editForm.get('images') as FormControl;
  }

  get images(): FormControl {
    return this.editForm.get('images') as FormControl;
  }

  get description(): FormControl {
    return this.editForm.get('description') as FormControl;
  }

  get price(): FormControl {
    return this.editForm.get('price') as FormControl;
  }

  get quantity(): FormControl {
    return this.editForm.get('quantity') as FormControl;
  }

  get short_desc(): FormControl {
    return this.editForm.get('short_desc') as FormControl;
  }

  get cat_id(): FormControl {
    return this.editForm.get('cat_id') as FormControl;
  }

  onSubmit() {
    const productToSave = new Product(
      this.title.value ,
      this.cat_id.value,
      this.description.value,
      this.image.value ,
      this.price.value,
      this.quantity.value ,
      this.images.value ,
      this.short_desc.value
    );

    console.log("PRODUCT TO SAVE ======>>>>>>" 
    + productToSave.price)


    this.productService.createProduct(productToSave).subscribe(
      _ =>{
        this.snackbarService.successMessage("Product added successfuly"),
        location.reload()
      }
    )
  }
}
