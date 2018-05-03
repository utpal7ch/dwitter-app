import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DweetDataService {

  private dweetURL = 'https://dwitter-utpal.herokuapp.com/dweet';

  constructor(private http: HttpClient) {

  }

  // public getDweets() {
  //   return this.http.post<User>(this.authUrl + '/login', userLogin)
  //   .map(response => response)
  //   .catch(this.handleError);
  // }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return Observable.throw(error);
  }
}
