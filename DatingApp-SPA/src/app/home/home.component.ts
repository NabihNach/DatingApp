import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    RegisterComponent,
    CommonModule
  ]
})
export class HomeComponent implements OnInit {
  registerMode = false;
  values: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  getValues(){
    this.http.get('http://localhost:5235/api/values').subscribe(response => {
this.values = response;
    }, error => {
      console.log(error);
    });
  }

  cancelRegisterMode(registerMode: boolean){
    this.registerMode = registerMode;
  }

}
