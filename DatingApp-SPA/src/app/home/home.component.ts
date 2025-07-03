import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { NgIf } from '@angular/common';
import { MemberListComponent } from '../members/member-list/member-list.component';
import { MemberCardComponent } from '../members/member-card/member-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RegisterComponent, NgIf]
})

export class HomeComponent implements OnInit {
  registerMode = false;

  constructor(private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/members']);
    }

  }

  registerToggle(){
    this.registerMode= true;
  }


  cancelRegisterMode(registerMode: boolean){
    this.registerMode = registerMode;
  }
}
