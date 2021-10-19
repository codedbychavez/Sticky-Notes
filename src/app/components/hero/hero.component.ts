import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  public userLoggedIn!: boolean;


  constructor(private authService: AuthService) { 
    this.authService.userLoggedIn$.subscribe(
      (userLoggedIn) => {
        this.userLoggedIn = userLoggedIn;
      }
    )
   }

  ngOnInit(): void {
  }

}
