import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any={};


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  login(){
    this.authService.login(this.model).subscribe(next => {
      console.log('Logged in successfully')
    }, error => {
      console.log('Failed to login')
    })
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(){
    localStorage.removeItem('token')
    console.log('logged out');
  }

}
