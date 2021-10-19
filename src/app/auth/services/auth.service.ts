import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';

import * as moment from "moment";
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Injector } from '@angular/core';
import { Subject } from 'rxjs';

export let InjectorInstance: Injector;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string;

  private check: any;

  public userLoggedIn = new Subject<any>(); 
  public userLoggedIn$ = this.userLoggedIn.asObservable();

  public showLoginForm = new Subject<any>(); 
  public showLoginForm$ = this.showLoginForm.asObservable();

  public userAccountCreated = new Subject<any>(); 
  public userAccountCreated$ = this.userAccountCreated.asObservable()

  constructor(private httpClient: HttpClient, private router: Router, private injector: Injector) { 
    this.baseUrl = environment.restApi.uri;
    InjectorInstance = this.injector;
  }


  updateUserLoggedIn(boolean: boolean) {
    this.userLoggedIn.next(boolean);
  }

  updateShowLoginForm(boolean: boolean) {
    this.showLoginForm.next(boolean);
  }

  updateUserAccountCreated(boolean: boolean) {
    this.userAccountCreated.next(boolean);
  }

  // login
  loginUser(authResponse: any) {
      this.setSession(authResponse)
    }
   

  logoutUser() {
    
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");

    localStorage.removeItem("expires_at");
    this.router.navigate(['account']);
    this.updateUserLoggedIn(false);
  }

  setSession(authResponse:any) {
    if(authResponse.refresh) {
      const refreshToken = authResponse.refresh;
      localStorage.setItem('refresh_token', JSON.stringify(refreshToken));
    }
    const decodedToken = this.decodeToken(authResponse.access);

    const token = authResponse.access;
    const expiresAt = moment().add(decodedToken.exp,'second');
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem("token", JSON.stringify(token));
    this.router.navigate(['stickies']);
    this.updateUserLoggedIn(true);
  }

  getAccessTokenWithRefreshToken() {
    const refreshToken = this.getrefreshToken();

    this.askForNewAccessTokenUsingRefeshToken(refreshToken).subscribe(
      (authResponse) => {
        console.log(authResponse)
        
        this.setSession(authResponse);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    )
  }


  public getToken(): any {
    const token = localStorage.getItem('token');
    return JSON.parse(token!);
  }

  public decodeToken(token: any): any {
    let decodedToken = {};

    if(token) {
      const jwtHelper: JwtHelperService = new JwtHelperService();
      decodedToken = jwtHelper.decodeToken(token);
    }

    return decodedToken;
  }

// get refresh token
  public getrefreshToken(): string {
    const refresh_token = localStorage.getItem('refresh_token');
    return JSON.parse(refresh_token!);
  }

  public isAuthenticated(): boolean {
    // Check if token is expired
    return this.checkTokenExpiration();

    }


  checkTokenExpiration() {
    
    const jwtHelper: JwtHelperService = new JwtHelperService();
    let token = this.getToken();
    // jwtHelper.isTokenExpired returns false when token is not expired but true if it is
    // Hence we flip the below and return thw opposite of the result
    if(jwtHelper.isTokenExpired(token)) {
      this.getAccessTokenWithRefreshToken();
      // token = this.getToken();
    }

    return !jwtHelper.isTokenExpired(token);

  }


  // Login user in
  checkAuthCredsAgainstApi(data: any) {
    return this.httpClient.post<any>(
      this.baseUrl + '/api/token/', data
    );
  }

  askForNewAccessTokenUsingRefeshToken(refresh_token: any) {
    let formData = new FormData();
    formData.append('refresh', refresh_token);
  
    return this.httpClient.post<any>(
      this.baseUrl + '/api/token/refresh/', formData
    );
  }
}
