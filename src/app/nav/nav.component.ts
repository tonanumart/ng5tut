import { AlertifyService } from './../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService,private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(data => {
        this.alertify.success('logined successfully');
    }, error => {
        this.alertify.error(error);
    });
  }

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertify.message('logout');
  }

  loggedIn() {
    // const token = localStorage.getItem('token');
    // // token = !!token;null => true => false;
    // // token = !!token;true => false => true;
    // return !!token;
    return this.authService.loggedIn();
  }

}
