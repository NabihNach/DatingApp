import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl= environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

constructor(private http: HttpClient) { }


login(model: any){
  return this.http.post(this.baseUrl + 'login', model)
  .pipe(map((response:any)=>{
    const user = response;
    if(user){
      localStorage.setItem('token', user.token);
      this.decodedToken = this.jwtHelper.decodeToken(user.token);
      console.log(this.decodedToken);
    }
  }))
}

register(model: any){
  return this.http.post(this.baseUrl + 'register', model);
}

loggedIn(){
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}


}
