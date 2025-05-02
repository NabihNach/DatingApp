import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BsDropdownModule }       from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FormsModule, HomeComponent, BsDropdownModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token){
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}
