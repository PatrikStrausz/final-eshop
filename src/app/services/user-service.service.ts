

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


  login(auth: Auth): Observable<boolean | void> {
    console.log(auth);

 
  
    return this.http
      .post(this.SERVER_URL + 'login', auth,  {responseType: 'text'})
    
      .pipe(
       
        map(token => {
          console.log(token);
        

          this.token = token;
          this.user = auth;
          this.name = auth.username;

         
         
         
          this.username = auth.username;
         
       
          this.snackbarService.successMessage(`${ auth.username} logged in successfuly`);
          
         
        
          this.router.navigateByUrl("/");
          location.reload()
         
          return true;
      }),
  
    
      catchError(error => {
         

         
          this.user = null;
      
          return this.processHttpError(error);
      }),
     
    
  )
 ;
  }

  logout(auth:Auth): Observable<any>{

  
    let headers = new HttpHeaders().set('Authorization', `${this.token}`);

  
    this.snackbarService.successMessage(`${ auth.username} logged out successfuly`);

    return this.http.post(this.SERVER_URL + "logout", auth,{ headers: headers }).pipe(
      tap((user) => {
        this.snackbarService.successMessage(
          'User logged out'
        );
        this.token = null;
        localStorage.removeItem('name');
        
       
      }),
      catchError((error) => this.processHttpError(error))
    );
    
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

  register(user: User): Observable<User> {
    return this.http.post<User>(this.SERVER_URL + '/register', user).pipe(
      tap((user) => {
        this.snackbarService.successMessage(
          'User ' + user.username + ' successfully registered, you can log in now'
        );
      }),
      catchError((error) => this.processHttpError(error))
    );
  }

  checkUserConflicts(user:User):any{
    return this.http.post<any>(this.SERVER_URL + "/user-conflicts", user).pipe(
      catchError((error) => this.processHttpError(error)))
  }


  saveUser(user:User): Observable<User>{

    return this.http.post<User>(this.SERVER_URL+"/user/edit", user).pipe(
      catchError(error => this.processHttpError(error))
    );

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