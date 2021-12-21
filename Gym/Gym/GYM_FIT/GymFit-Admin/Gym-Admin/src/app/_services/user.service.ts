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
  url:string = environment.apiURL + 'Account/'

  constructor(private http :HttpClient, private router: Router) { }

  login(model: any) {
    return this.http.post(this.url + 'Login', model);
    
  }

  loggedIn() {
    if (!!localStorage.getItem('token') && !!localStorage.getItem('expiration')) {
      let expDate = new Date(localStorage.getItem('expiration'));
      let todayDate = new Date(Date.parse(Date()));
      return todayDate < expDate ? true : false; 
    }
    return false;
  }

   getUsers() {
      return this.http.get<User[]>(environment.apiURL + 'users/GetUsers');
  }

  toggleUser(id:string){
    return this.http.post(environment.apiURL+'users/UserToggle', null,{params:{
      id: id
    }});
  }

  activateUser(id:string){
    return this.http.post(environment.apiURL+'users/ActivateUser', null,{params:{
      id: id
    }});
  }

  getUserById(id:string){
    const params = new HttpParams().set('id',id);
    return this.http.get<User>(environment.apiURL+'users/GetUserById', {params:params});
  }

  editUser(user: User){
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'multipart/form-data'
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        //application/x-www-url-formencoded
      })
  };
    
    return this.http.post(environment.apiURL+'users/UserUpdate', user, {params:{
      id : user.id.toString()
    }});
  }

  createUser(user: User){
    
    return this.http.post(environment.apiURL+'register', user);
  }

  userLogout(){
     this.http.post(environment.apiURL+'logout',null);
     localStorage.clear();
     this.router.navigate(['/login']);
  }

  // async getUser(id: string) {
  //   try {
  //     let params = new HttpParams().set('id', id);
  //     return await this.http.get<User>(environment.apiURL + 'admin/GetUserById', { params: params }).toPromise();
  //   } catch (error) {
  //     return new User();
  //   }
  // }

  // async EditUser(user: User) {
  //   try {
  //     let params = new HttpParams().set('id', user.IDUser.toString());

  //     var res = await this.http.post(environment.apiURL + 'admin/EditUser', user, { params: params }).toPromise();
  //     return res['message'];
  //   } catch (err) {
  //     return err.error['message'] == null ? 'Error can\'t connect to server' : err.error['message'];
  //   }
  // }

  // async DeleteUser(id: string) {
  //   try {
  //     let params = new HttpParams().set('id', id);
  //     var res = await this.http.post(environment.apiURL + 'admin/ToggleUser', null,{ params: params }).toPromise();
  //     return res['message'];
  //   } catch (err) {
  //     return err.error['message'] == null ? 'Error can\'t connect to server' : err.error['message'];
  //   }
  // }

  // async resetPassword(user: User) {
  //   let params = new HttpParams().set('id', user.IDUser.toString());
  //   return await this.http.post(environment.apiURL + 'admin/ResetPassword', { Id: user.IDUser, Password: user.UserPassword }, { params: params }).toPromise();
  // }

  // async register(user: User) {
  //   try {
  //     var res= await this.http.post(environment.apiURL + 'admin/register', {
  //       userName: user.UserName,
  //       email: user.UserEmail,
  //       password: user.UserPassword,
  //       isadmin: user.IDRole
  //     }).toPromise();
  //     return res['message'];
  //   } catch (err) {
  //     return err.error['message'] == null ? 'Error can\'t connect to server': err.error['message'];
  //   }
  // }
}
