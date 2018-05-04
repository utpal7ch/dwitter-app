import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Login } from '../../app-shared/login';
import { User } from '../../app-shared/user';
import { HttpServiceBase } from './http-service-base';

@Injectable()
export class AuthDataService extends HttpServiceBase {

  private authUrl = 'https://dwitter-utpal.herokuapp.com/account';

  constructor(private http: HttpClient) {
    super();
  }

  public login(loginDetails: Login): Observable<User> {
    return this.http.post<User>(this.authUrl + '/login', loginDetails)
      .map(response => {
        this.createAndSaveAuthToken(response);
        return response;
      })
      .catch(this.handleError);
  }

  public isLoggedIn(): boolean {
    return this.hasValidAuthToken();
  }

  public logout() {
    this.clearAuthToken();
  }

  private handleError(error: HttpErrorResponse) {
    //console.log(error);
    return Observable.throw(error);
  }
}
