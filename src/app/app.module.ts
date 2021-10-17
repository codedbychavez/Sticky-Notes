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
import { ManageComponent } from './pages/manage/manage.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
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
    redirectTo: 'manage',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'manage',
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
    ManageComponent,
    AboutComponent,
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
