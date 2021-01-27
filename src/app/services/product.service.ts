import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModelServer, serverResponse } from '../models/product.model';
import { Observable, ObservedValueOf } from 'rxjs';
import { Categories } from '../models/categories.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private SERVER_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllProducts(numberOfResults: number = 10): Observable<ProductModelServer[]> {
    return this.http.get<Array<any>>(this.SERVER_URL + '/products', {
      params: {
        limit: numberOfResults.toString(),
      },
    });
  }

  getSingleProduct(id: number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(
      this.SERVER_URL + '/products/' + id
    
    );
  }

  getCategoryName(id:number):Observable<Categories>{
    return this.http.get<Categories>(this.SERVER_URL +"/products/category/"+id);
  }

  getCategories():Observable<any>{
    return this.http.get<Array<any>>(this.SERVER_URL + '/categories');
  }


  getCategoriesById(id:number):Observable<ProductModelServer[]>{
    return this.http.get<ProductModelServer[]>(this.SERVER_URL + "/list/products/category/" + id);
  }
  
}
