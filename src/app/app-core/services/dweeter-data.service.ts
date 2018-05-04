import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Dweet } from "../../app-shared/dweet";
import { HttpServiceBase } from "./http-service-base";
import { Dweeter } from "../../app-shared/dweeter";
import { DweeterSearchResult } from "../../app-shared/dweeter-search-result";

@Injectable()
export class DweeterDataService extends HttpServiceBase {

  private dweeterURL = 'https://dwitter-utpal.herokuapp.com/dweeter';

  constructor(private http: HttpClient) {
    super();
  }

  public searchDweeter(searchTerm: string): Observable<DweeterSearchResult[]> {
    const options = { headers: this.getHeadersForAuth() };
    return this.http.get<DweeterSearchResult[]>(`${this.dweeterURL}/search?queryString=${searchTerm}`, options)
    .map(response => response)
    .catch(this.handleError);
  }

  public followDweeter(followerId: string): Observable<DweeterSearchResult[]> {
    const options = { headers: this.getHeadersForAuth() };
    return this.http.patch<DweeterSearchResult[]>(`${this.dweeterURL}/${followerId}/follow`, undefined, options)
    .map(response => response)
    .catch(this.handleError);
  }



  private handleError(error: HttpErrorResponse) {
    //console.log(error);
    return Observable.throw(error);
  }
}
