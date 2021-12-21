import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from 'app/_Models/User';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  users:User[];
  user: User;
  model: any;
  url: string = environment.apiURL + 'Account/';

  constructor(private http :HttpClient, private router: Router) { }

  login(model: any) {
    return this.http.post(this.url + 'Login', model);
    
  }

  loggedIn() {
    if (!!localStorage.getItem('token') && !!localStorage.getItem('expiration')) {
      let expDate = new Date(localStorage.getItem('expiration'));
      let todayDate = new Date();
      return todayDate.getTime() < expDate.getTime() ? true : false; 
    }
    return false;
  }

  register(user: User){
    
    return this.http.post(this.url+'Register', user);
  }

  userLogout(){
     this.http.post(environment.apiURL+'logout',null);
     localStorage.clear();
     this.router.navigate(['/login']);
  }

}
