import { EditOrderComponent } from './../../edit-order/edit-order.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order.service';
import { SnackbarService } from './../../../services/snackbar.service';
import { MatPaginator } from '@angular/material/paginator';
import { Order } from './../../../models/order.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-orders-list',
  templateUrl: './admin-orders-list.component.html',
  styleUrls: ['./admin-orders-list.component.css']
})
export class AdminOrdersListComponent implements AfterViewInit {


  orderDataSource = new MatTableDataSource<Order>();

  columnsOrder = ['id','order_created', 'username', 'total', 'state', 'actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator

  constructor(
    private snackbarService: SnackbarService,
    private orderService:OrderService,
    public dialog: MatDialog) { }

  ngAfterViewInit(): void {

    this.orderDataSource.sort = this.sort
    this.orderDataSource.paginator = this.paginator

    this.orderService.getOrders().subscribe(orders =>{
      this.orderDataSource.data = orders
      console.log(orders)
    })
  }

  
  editOrder(order:Order){
    let dialogRef = this.dialog.open(EditOrderComponent, {
      height: '300px',
      width: '600px',
      data:{
        data: order
      }
    }).afterClosed().subscribe(_a => this.refresh());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orderDataSource.filter = filterValue.trim().toLowerCase();
  }

  refresh(){
    this.orderService.getOrders().subscribe(orders =>{
      this.orderDataSource.data = orders
      console.log(orders)
    })
  }



}
