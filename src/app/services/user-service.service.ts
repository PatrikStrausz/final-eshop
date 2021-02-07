import { ProductModelServer } from './../models/product.model';


import { Address } from './../models/address.model';
import { User } from './../models/user.model';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Auth } from '../models/auth';



@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  auth = false;
  private SERVER_URL = 'http://localhost:8080/';


  public user;

username: string;

  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject< ResponseModel | object>(null);

  loginMessage$ = new BehaviorSubject<string>(null);
  userRole: number;

  userId:number;

  search:string

  prod: ProductModelServer[]

  constructor(

    private http: HttpClient,
    private snackbarService: SnackbarService,
    private router: Router
  ) {
    
  }




  set token(value: string) {
    if (value) {
        localStorage.setItem('token', value);
    } else {
        localStorage.removeItem('token');
    }
}

set name(value: string) {
  if (value) {
      localStorage.setItem('name', value);
  } else {
      localStorage.removeItem('name');
  }
}


  get token(): string {
    return localStorage.getItem('token') as string;
}

get name(): string {
  return localStorage.getItem('name') as string;
}


  login(auth: Auth): Observable<boolean | any> {
    console.log(auth);

   return this.http.post(this.SERVER_URL + '/login', auth, {responseType: 'text'}).pipe(
    map(token =>{
      this.token = token;
      this.user = auth;
      this.name = auth.username;
      this.username = auth.username;

    }),
    tap(_a =>{
      this.snackbarService.successMessage(this.name + "  successfully logged in"),      this.router.navigateByUrl('/')
      .then(() => {
        location.reload();
      });
      
    
    }),
 
    
    catchError((error) => this.processHttpError(error))
  )
 
  }

  logout(auth:Auth): Observable<any>{

  
    let headers = new HttpHeaders().set('Authorization', `${this.token}`);
    
  
    this.snackbarService.successMessage(`${ auth.username} logged out successfuly`);

    return this.http.post(this.SERVER_URL + "logout", auth,{ headers: headers}).pipe(
      tap((user) => {
       
        this.token = null;
        localStorage.removeItem('name')
        
       
      }),
      catchError((error) => this.processHttpError(error))
    );
    
  }

  getAllUsers():Observable<User[]>{
    return this.http.get<Array<any>>(this.SERVER_URL + "users").pipe(
      catchError((error) => this.processHttpError(error))
    )
  }


  getUserById(id:number):Observable<User>{
    return this.http.get<User>(this.SERVER_URL+"users/"+id).pipe(
      catchError((error) => this.processHttpError(error))
    )
  }

  getAddressByUserId(id:number):Observable<Address>{
    return this.http.get<Address>(this.SERVER_URL+"addresses/user/"+id).pipe(
      catchError((error) => this.processHttpError(error))
    )
  }

   getUserByUsername(username:string):Observable<User>{
    return this.http.get<User>(this.SERVER_URL+"users/name/"+username).pipe(
      catchError((error) => this.processHttpError(error))
    )
  }


  updateAddress(address:Address):any{
    return this.http.post(this.SERVER_URL+"/addresses/update", address, {responseType: 'text'}).pipe(
      catchError((error) => this.processHttpError(error))
    )
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.SERVER_URL + '/register', user,).pipe(
      tap((user) => {
        this.snackbarService.successMessage(
          'User ' + user.username + ' successfully registered, you can log in now'
        );
      }),
      catchError((error) => this.processHttpError(error))
    );
  }

  checkUserConflicts(user:User):any{
    return this.http.post(this.SERVER_URL + "/user-conflicts", user,{responseType: 'text'}).pipe(
      catchError((error) => this.processHttpError(error)))
  }




  saveUser(user:User): Observable<User>{

    return this.http.post<User>(this.SERVER_URL+"/user/edit", user).pipe(
      catchError(error => this.processHttpError(error))
    );

  }

  deleteUser(user:User):any{
    return this.http.post(this.SERVER_URL+"/user/delete",user,{responseType: 'text'}).pipe(
     tap(_a =>   this.router.navigateByUrl('/login')
      .then(() => {
        window.location.reload();
      })),

      catchError(error => this.processHttpError(error))
    );
  }

  processHttpError(error) {
   
    if (error instanceof HttpErrorResponse) {
      console.log("ERROR>>>>>>>>"+ error.error)
      if (error.status === 0) {
        this.snackbarService.errorMessage('Server is unreachable');
      } else {
        if (error.status >= 400 && error.status < 500) {
          const message =
            error.error.errorMessage ?? JSON.parse(error.error).error;
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

export interface ResponseModel {
  token: string;
  auth: boolean;
  email: string;
  username: string;
  fname: string;
  lname: string;
  photoUrl: string;
  userId: number;
  type: string;
  role: number;
}
