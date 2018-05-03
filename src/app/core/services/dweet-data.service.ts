import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Dweet } from "../../shared/dweet";

@Injectable()
export class DweetDataService {

  private dweetURL = 'https://dwitter-utpal.herokuapp.com/dweet';

  constructor(private http: HttpClient) {

  }

  public getDweets(): Observable<Dweet[]> {
    return this.http.get<Dweet[]>(this.dweetURL + '/dweet')
    .map(response => response)
    .catch(this.handleError);
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return Observable.throw(error);
  }
}
