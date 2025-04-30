import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ValueComponent implements OnInit {

  values:any;

  constructor(private http: HttpClient) { }


  ngOnInit() {
    this.getValues();
  }


  getValues(){
    this.http.get('http://localhost:5183/api/values').subscribe(response => {
        this.values = response;
    }, error => {
      console.log(error)
    });
  }
}
