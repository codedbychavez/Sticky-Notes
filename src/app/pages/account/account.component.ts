import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public currentUser: any;
  public showSignup: boolean;
  public userLoggedIn!: boolean;
  public showLoginForm!: boolean;
  public userAccountCreated!: boolean;
  public userAccountDeleted!: boolean;



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

    this.authService.userAccountDeleted$.subscribe(
      (accountDeleted) => {
        this.userAccountDeleted = accountDeleted;
      }
    )

  
  }

  ngOnInit(): void {
    const userLoggedIn  = this.authService.isAuthenticated();
    this.userLoggedIn = userLoggedIn;
    this.authService.updateShowLoginForm(true);
  }

  logoutUser() {
    this.authService.logoutUser();
    this.authService.updateShowLoginForm(true);
  }

  deleteUserAccount() {
    const confirmed = confirm('Are you sure?');
    if (confirmed) {
      this.authService.deleteUserAccount().subscribe(
        (accDeletedResp) => {
          this.authService.logoutUser();
          this.authService.updateUserAccountDeleted(true);
        }, 
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      )
    }
  }

  showLoginFormFunction(bool: boolean) {
    this.authService.updateShowLoginForm(bool);

  }

}
