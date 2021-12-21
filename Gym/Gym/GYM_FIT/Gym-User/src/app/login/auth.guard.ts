import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public userService: UserService, public router: Router) { }
    canActivate(): boolean{
      console.log('loglog123')
      if (!this.userService.loggedIn()) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
  }
  
}
