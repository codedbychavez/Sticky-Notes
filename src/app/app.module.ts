import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthService } from './auth/services/auth.service';
import { AuthInterceptor } from './auth/interceptor/auth-interceptor';

// Auth Guard
import { AuthGuardService } from './auth/services/auth-guard.service';

// Components
import { AppComponent } from './app.component';
import { AccountComponent } from './pages/account/account.component';
import { HeroComponent } from './components/hero/hero.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './pages/about/about.component';
import { StickiesComponent } from './pages/stickies/stickies.component';
import { LoginFormComponent } from './auth/components/login-form/login-form.component';
import { SignupFormComponent } from './auth/components/signup-form/signup-form.component';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'stickies',
    component: StickiesComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'account',
    component: AccountComponent
  },

  {
    path: '',
    component: AccountComponent,
    pathMatch: 'full'
  },
  
]

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    FooterComponent,
    SideNavComponent,
    NavbarComponent,
    StickiesComponent,
    AboutComponent,
    AccountComponent,
    LoginFormComponent,
    SignupFormComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
  ],
  providers: [AuthService,
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
