import { OrderService } from 'src/app/services/order.service';
import { Order } from './../../models/order.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements AfterViewInit {


  orderDataSource = new MatTableDataSource<Order[]>();

  columns = ['id','order_created', 'username', 'total', 'state'];


orders : Order[] 

username:string

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderService:OrderService) { }

  ngAfterViewInit(): void {

    
    this.username = localStorage.getItem('name')

    this.orderDataSource.paginator = this.paginator;
    this.orderDataSource.sort = this.sort;

    this.orderService.getOrdersByUsername(this.username).subscribe( o =>
      { this.orders = o,
        this.orderDataSource.data = o
      console.log(o)}
    )

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orderDataSource.filter = filterValue.trim().toLowerCase();
  }


}
