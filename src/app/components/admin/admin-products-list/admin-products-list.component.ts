import { MatPaginator } from '@angular/material/paginator';
import { AddProductComponent } from './../../add-product/add-product.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from './../../../services/snackbar.service';
import { ProductModelServer } from './../../../models/product.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EditProductComponent } from '../../edit-product/edit-product.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-products-list',
  templateUrl: './admin-products-list.component.html',
  styleUrls: ['./admin-products-list.component.css']
})
export class AdminProductsListComponent implements AfterViewInit {


  productDataSource = new MatTableDataSource<ProductModelServer>()

  columnsProduct = ['id', 'title', 'image', 'images', 'description', 'price', 'quantity', 'short_desc', 'cat_id','actions'];


  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(
    private snackbarService: SnackbarService,
    private productService:ProductService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {

    this.productDataSource.sort = this.sort
    this.productDataSource.paginator = this.paginator

    this.productService.getAllProducts().subscribe(products =>{
      this.productDataSource.data = products
     
    })
  }

  deleteProduct(product:ProductModelServer){
    this.productService.deleteProduct(product).subscribe(_=>{
      this.snackbarService.successMessage(product.title + ' has been deleted')
    

    }

    )
  }

  openAddProduct(){
    let dialogRef = this.dialog.open(AddProductComponent, {
      height: '600px',
      width: '600px'
    }).afterClosed().subscribe(_a => this.refresh());
  }

  editProduct(product:ProductModelServer){
    let dialogRef = this.dialog.open(EditProductComponent, {
      height: '600px',
      width: '600px',
      data:{
        data: product
      }
    }).afterClosed().subscribe(_a => this.refresh());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productDataSource.filter = filterValue.trim().toLowerCase();
  }

  refresh(){
    this.productService.getAllProducts().subscribe(products =>{
      this.productDataSource.data = products
     
    })
  }

}
