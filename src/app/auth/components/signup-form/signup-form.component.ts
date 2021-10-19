import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { User } from '../../models/user.model';
import { SignupService } from '../../services/signup.service';
import { environment } from 'src/environments/environment';

// Validation service imports
import { ValidatorService } from '../../validators/validator.service';

// Custom validators
import { mustMatch, passwordStrengthValidator } from '../../validators/password.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  public baseUrl = environment.restApi.uri;

  public signupForm!: FormGroup;
  private userModel = new User();
  public emailExistResult!: boolean;

  public showSignUpSuccess!: boolean;


  constructor(
    public formBuilder: FormBuilder, 
    private signupService: SignupService, 
    public router: Router,
    public httpClient: HttpClient,
    private validationSevice: ValidatorService,
    private authService: AuthService,
  ) { 
    this.userModel = new User();
    this.showSignUpSuccess = false;
  }

  ngOnInit(): void {
    this.initializeSignupForm();
  }


  initializeSignupForm(): void {
    this.signupForm = this.formBuilder.group({
    firstName: [this.userModel.firstName, Validators.required],
    lastName: [this.userModel.lastName, Validators.required],
    email: [this.userModel.email, [Validators.required, Validators.email]],
    password: [this.userModel.password, [Validators.required, Validators.minLength(6), Validators.maxLength(16), passwordStrengthValidator()]],
    confirmPassword: [this.userModel.confirmPassword, [Validators.required]],

    }, {
      validator: mustMatch('password', 'confirmPassword'),
    })
  }


  signupFormSubmit() {
    const data = this.signupForm.getRawValue();
    this.signupService.signupUser(data).subscribe(
      (signupUserResponse) => {
        this.signupSuccess();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    )
  }

  showLoginForm() {
    this.authService.updateShowLoginForm(true);
  }

  signupSuccess() {
    this.signupForm.reset();
    this.showSignUpSuccess = true;
    this.authService.updateShowLoginForm(true);
    this.authService.updateUserAccountCreated(true);
  }

    // Email validation functions
    
    emailExistValidator(event: any){
      const email = event.target.value;
          // Validate validate at endpoint
          this.validationSevice.emailExist(email).subscribe(
              (result: any) => {
                  this.emailExistResult = result;
                  if(this.emailExistResult) {
                    this.signupForm.controls['email'].setErrors({'emailTaken': true});
                  } else {
                    // do nothing
                   
                  }
              }
          )
      }

}
