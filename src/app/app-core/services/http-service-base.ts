import { User } from "../../app-shared/user";
import { HttpHeaders } from "@angular/common/http";

export class HttpServiceBase {
  private sessionStorage: Storage;
  private authHeaderKey = 'userid';
  private userKey = 'user';

  constructor() {
    this.sessionStorage = window.sessionStorage;
  }

  public getHeadersForAuth(): HttpHeaders  {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    if(this.hasValidAuthToken()) {
      headers = headers.append(this.authHeaderKey, this.sessionStorage.getItem(this.authHeaderKey));
    }
    return headers;
  }

  public createAndSaveAuthToken(user: User): void {
    this.sessionStorage.setItem(this.authHeaderKey, user._id);
    this.sessionStorage.setItem(this.userKey, JSON.stringify(user));
  }

  public clearAuthToken(): void {
    this.sessionStorage.removeItem(this.authHeaderKey);
  }

  public hasValidAuthToken(): boolean {
    return this.sessionStorage.getItem(this.authHeaderKey) !== null;
  }

  public getUserDetails() {
    return JSON.parse(this.sessionStorage.getItem(this.userKey));
  }

  public getLoggedInUserId(): string {
    return this.sessionStorage.getItem(this.authHeaderKey);
  }
}
