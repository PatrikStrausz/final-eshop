import { Product, ProductModelServer } from './../../models/product.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  product: ProductModelServer;

  editForm = new FormGroup({
    title: new FormControl(''),
    image: new FormControl(''),
    images: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    short_desc: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.product = data.data;
  }

  ngOnInit(): void {
    this.title.setValue(this.product.title);
    this.image.setValue(this.product.image);
    this.images.setValue(this.product.images);
    this.description.setValue(this.product.description);
    this.price.setValue(this.product.price);
    this.quantity.setValue(this.product.quantity);
    this.short_desc.setValue(this.product.short_desc);
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

  onSubmit() {
    const productToSave = new Product(
      this.product.id,
      this.title.value === '' ? this.product.title : this.title.value,
      this.product.category,
      this.description.value === ''
        ? this.product.description
        : this.description.value,
      this.image.value === '' ? this.product.image : this.image.value,
      this.price.value === '' ? this.product.price : this.price.value,

      this.quantity.value === '' ? this.product.quantity : this.quantity.value,

      this.images.value === '' ? this.product.images : this.images.value,

      this.short_desc.value === ''
        ? this.product.short_desc
        : this.short_desc.value
    );

    console.log("PRODUCT TO SAVE ======>>>>>>" 
    + productToSave.title)
  }
}
