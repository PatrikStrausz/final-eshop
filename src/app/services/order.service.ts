import { catchError } from 'rxjs/operators';
import { SnackbarService } from './snackbar.service';
import { EMPTY, Observable } from 'rxjs';
import { Order } from './../models/order.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private products: ProductResponseModel[] = [];

  private SERVER_URL = "http://localhost:8080/"

  constructor(private http: HttpClient,
    private snackbarService:SnackbarService) { }


getSingleOrder(orderId: number){
  return this.http.get<ProductResponseModel[]>(this.SERVER_URL+"/orders/"+orderId).pipe(
    catchError(error => this.processHttpError(error))).toPromise();
}


getOrdersByUsername(username:string):Observable<any>{
  return this.http.get<Array<any>>(this.SERVER_URL + "/orders/username/"+username).pipe(
    catchError(error => this.processHttpError(error)))
}

getOrders():Observable<any>{
  return this.http.get<Array<any>>(this.SERVER_URL+"/orders").pipe(
    catchError(error => this.processHttpError(error)))
}

updateOrder(order:Order){
  return this.http.post(this.SERVER_URL + "/orders/edit", order,{responseType: 'text'} ).pipe(
    catchError(error => this.processHttpError(error)))
}




processHttpError(error) {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) {
      this.snackbarService.errorMessage('Server is unreachable');
    } else {
      if (error.status >= 400 && error.status < 500) {
        const message =
          error.error.errorMessage ?? JSON.parse(error.error).errorMessage;
        this.snackbarService.errorMessage(message);
      } else {
        this.snackbarService.errorMessage('Server error: ' + error.message);
      }
    }
  } else {
    this.snackbarService.errorMessage(
      "Programmer's error : " + JSON.stringify(error)
    );
  }
  console.error('Server error: ', error);
  return EMPTY;
}





}

interface ProductResponseModel{
  id: number;
  title: string;
  description: string;
  price : number;
  quantityOrdered: number;
  image: string;
}