import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Dweet } from "../../app-shared/dweet";
import { HttpServiceBase } from "./http-service-base";
import { Dweeter } from "../../app-shared/dweeter";

@Injectable()
export class DweeterDataService extends HttpServiceBase {

  private dweeterURL = 'https://dwitter-utpal.herokuapp.com/dweeter';

  constructor(private http: HttpClient) {
    super();
  }

  public searchDweeter(searchTerm: string): Observable<Dweeter[]> {
    const options = { headers: this.getHeadersForAuth() };
    return this.http.get<Dweeter[]>(`${this.dweeterURL}/search?queryString=${searchTerm}`, options)
    .map(response => response)
    .catch(this.handleError);
  }

  private handleError(error: HttpErrorResponse) {
    //console.log(error);
    return Observable.throw(error);
  }
}
