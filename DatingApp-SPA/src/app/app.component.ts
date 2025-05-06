import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from "./home/home.component";
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  imports: [ NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent implements OnInit {
  [x: string]: any;
  jwtHelper = new JwtHelperService();
  constructor(private authService: AuthService){}

  ngOnInit(){
    const token = localStorage.getItem('token');
    if(token){
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }


}
