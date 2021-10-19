import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public showSignup: boolean;
  public userLoggedIn!: boolean;
  public showLoginForm!: boolean;
  public userAccountCreated!: boolean;


  constructor(private authService: AuthService) { 
    this.showSignup = false;

    this.authService.userLoggedIn$.subscribe(
      (userLoggedIn) => {
        this.userLoggedIn = userLoggedIn;
      }
    )

    this.authService.showLoginForm$.subscribe(
      (showLogin) => {
        this.showLoginForm = showLogin;
      }
    )

    this.authService.userAccountCreated$.subscribe(
      (accountCreated) => {
        this.userAccountCreated = accountCreated;
      }
    )
  }

  ngOnInit(): void {
    const userLoggedIn  = this.authService.isAuthenticated();
    this.userLoggedIn = userLoggedIn;
  }

  logoutUser() {
    this.authService.logoutUser();
  }

  showLoginFormFunction(bool: boolean) {
    this.authService.updateShowLoginForm(bool);

  }

}
