import { Http, Headers , RequestOptions , Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { map ,  tap  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    baseUrl = 'http://localhost:5000/api/auth/';
    userToken: any;

    constructor(private http: Http) { }

    login(model: any){
      return this.http.post(this.baseUrl + 'login' , model , this.registerOptions())
                      .pipe(tap(console.log),
                            map((data: Response) => {
                              const user  = data.json();
                              if (user) {
                                localStorage.setItem('token', user.tokenString);
                                this.userToken = user.token;
                              }
                            }));

  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model , this.registerOptions())
  }

  registerOptions() {
    const headers = new Headers({'Content-type' : 'application/json'});
    return new RequestOptions({headers : headers});
  }
}
