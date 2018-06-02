import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AlertifyService } from './_services/alertify.service';
import { AuthService } from './_services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { BsDropdownModule } from 'ngx-bootstrap';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [AppComponent, NavComponent, HomeComponent, RegisterComponent],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5001/auth/']
      }
    }),
    BsDropdownModule.forRoot()
  ],
  providers: [AuthService, AlertifyService, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule {}
