import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { _throw } from "rxjs/observable/throw";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl = "http://localhost:5000/api/auth/";
  userToken: any;
  decodedToken: any;

  constructor(private http: Http, private jwtHelper: JwtHelperService) {}

  login(model: any) {
    return this.http
      .post(this.baseUrl + "login", model, this.registerOptions())
      .pipe(
        map((data: Response) => {
          const user = data.json();
          if (user) {
            localStorage.setItem("token", user.tokenString);
            this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
            this.userToken = user.token;
          }
        }),
        catchError(err => this.handleError(err))
      );
  }

  loggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }

  register(model: any) {
    return this.http
      .post(this.baseUrl + "register", model, this.registerOptions())
      .pipe(
        map(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  registerOptions() {
    const headers = new Headers({ "Content-type": "application/json" });
    return new RequestOptions({ headers: headers });
  }

  private handleError(error: any) {
    const appError = error.headers.get("Application-Error");
    if (appError) {
      return _throw(appError);
    }
    const servError = error.json();
    let modelStateErrors = "";
    if (servError) {
      for (const key in servError) {
        if (servError[key]) {
          modelStateErrors += servError[key] + "\n";
        }
      }
    }
    return _throw(modelStateErrors || "Server Error");
  }
}
