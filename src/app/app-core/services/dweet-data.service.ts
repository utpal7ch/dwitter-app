import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Dweet } from "../../app-shared/dweet";
import { HttpServiceBase } from "./http-service-base";

@Injectable()
export class DweetDataService extends HttpServiceBase {

  private dweetURL = 'https://dwitter-utpal.herokuapp.com/dweet';

  constructor(private http: HttpClient) {
    super();
  }

  public getDweets(): Observable<Dweet[]> {
    const options = { headers: this.getHeadersForAuth() };
    return this.http.get<Dweet[]>(this.dweetURL, options)
      .map(response => response)
      .catch(this.handleError);
  }

  public createDweet(message: string): Observable<Dweet> {
    const options = { headers: this.getHeadersForAuth() };
    return this.http.post<Dweet>(`${this.dweetURL}/create`, { message: message }, options)
      .map(response => response)
      .catch(this.handleError);
  }

  public likeDweet(dweetId: string): Observable<Dweet> {
    const options = { headers: this.getHeadersForAuth() };
    return this.http.patch<Dweet>(`${this.dweetURL}/${dweetId}/like`, undefined, options)
      .map(response => {
        if(response) {
          return this.getLoggedInUserId();
        }
      })
      .catch(this.handleError);
  }

  private handleError(error: HttpErrorResponse) {
    //console.log(error);
    return Observable.throw(error);
  }
}
