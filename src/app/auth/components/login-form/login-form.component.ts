import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Login } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;
  loginModel = new Login();
  error!: string;

  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService,
    public router: Router
    ) { 
      this.loginModel = new Login();

      this.authService.errors$.subscribe(
        (errorMessage) => {
          this.error = errorMessage;
        }
      )
    }

  ngOnInit(): void {
    this.initializeLoginForm();
    // this.authService.logoutUser();
  }

  initializeLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: [this.loginModel.username, [Validators.required, Validators.email]],
      password: [this.loginModel.password, [Validators.required]]
    })
  }


  loginFormSubmit() {
    // Check if user is already authenticated
    const _isAuthenticated = this.authService.isAuthenticated();

    if(_isAuthenticated) {
      this.router.navigate(['stickies']);
    } else {
      const data = this.loginForm.getRawValue();
      this.authService.checkAuthCredsAgainstApi(data).subscribe(
        (authResponse) => {
          this.authService.loginUser(authResponse);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          this.authService.errors.next(err.error.detail);
        }
      )
    }
  }

}
