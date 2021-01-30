import { MatDialog } from '@angular/material/dialog';
import { ProductService } from './../../services/product.service';
import { ProductModelServer } from './../../models/product.model';
import { Router } from '@angular/router';
import { SnackbarService } from './../../services/snackbar.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from './../../models/user.model';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements AfterViewInit {
  usersDataSource = new MatTableDataSource<User>();


  productDataSource = new MatTableDataSource<ProductModelServer>()

  columns = ['id', 'username', 'email', 'role', 'actions'];
  columnsProduct = ['id', 'title', 'image', 'images', 'description', 'price', 'quantity', 'short_desc', 'cat_id','actions'];

  @ViewChild(MatSort) sort: MatSort;



  constructor(
    private userService: UserServiceService,
    private snackbarService: SnackbarService,
    private productService:ProductService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.usersDataSource.sort = this.sort;


    this.userService.getAllUsers().subscribe((users) => {
      this.usersDataSource.data = users;
    });

    this.productService.getAllProducts().subscribe(products =>{
      this.productDataSource.data = products,
      console.log(products)
    })
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe((_) => {
      this.snackbarService.successMessage(user.username + ' has been deleted'),
        this.router.navigateByUrl('/admin');
    });
  }

  deleteProduct(product:ProductModelServer){
    this.productService.deleteProduct(product).subscribe(_=>{
      this.snackbarService.successMessage(product.title + ' has been deleted'),
      location.reload()

    }

    )
  }

  editProduct(product:ProductModelServer){
    let dialogRef = this.dialog.open(EditProductComponent, {
      height: '600px',
      width: '600px',
      data:{
        data: product
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersDataSource.filter = filterValue.trim().toLowerCase();
    this.productDataSource.filter = filterValue.trim().toLowerCase();
  }
}
