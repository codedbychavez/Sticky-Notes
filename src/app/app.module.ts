import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccountComponent } from './pages/account/account.component';
import { HeroComponent } from './components/hero/hero.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewComponent } from './pages/new/new.component';
import { StickiesComponent } from './pages/stickies/stickies.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

const routes: Routes = [
  {
    path: 'stickies',
    component: StickiesComponent,
  },
  {
    path: 'new',
    component: NewComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: '',
    redirectTo: 'stickies',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'stickies',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    HeroComponent,
    FooterComponent,
    SideNavComponent,
    NavbarComponent,
    NewComponent,
    StickiesComponent,
    AboutComponent,
    LoginFormComponent,
    SignupFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
