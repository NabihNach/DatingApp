import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  @Output() cancelRegister = new EventEmitter();



  model:any = {};
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  register(){

    this.authService.register(this.model).subscribe(() =>{
      console.log('registration successful')
    }, error =>{
      console.log(error);
    }
    )
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log("cancelled");
  }
}
