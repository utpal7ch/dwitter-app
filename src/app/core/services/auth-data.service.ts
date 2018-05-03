import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Login } from '../../shared/login';
import { User } from '../../shared/user';

@Injectable()
export class AuthDataService {

  private authUrl = 'https://dwitter-utpal.herokuapp.com/account';

  constructor(private http: HttpClient) { }

  public login(userLogin: Login): Observable<User> {
    return this.http.post<User>(this.authUrl + '/login', userLogin)
    .map(response => response)
    .catch(this.handleError);
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return Observable.throw(error);
  }
}
