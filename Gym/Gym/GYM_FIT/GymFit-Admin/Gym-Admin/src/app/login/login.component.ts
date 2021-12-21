import { stringify } from '@angular/compiler/src/util';
import { Component, ElementRef } from '@angular/core';
import {  Router } from '@angular/router';
import { UserService } from '../_services/user.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
/** login component*/
export class LoginComponent {
  model: any = {};
  errors: any = {};
  constructor(public userService: UserService, public router: Router, private elementRef: ElementRef) {

  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
  }
  ngOnInit() {

  }

  OnSubmit() {
    this.userService.login(this.model).subscribe(
      res => {
        if (res) {
          if (res['Token']) {
            var expdate = new Date();
            expdate = res['ExpiresIn'];
            console.log(expdate);
            localStorage.setItem('token', res['Token']);
            localStorage.setItem('expiration', expdate.toString());
            this.router.navigate(['']);
          }
          localStorage.setItem('ID',res['User']['ID']);
          localStorage.setItem('Email',res['User']['Email']);
        }
      },
      err => {
        this.errors.login = err.error.message;
        if (err.status === 401) {
          this.errors.login = 'Invalid Email or Password';
        }
      }
    );
  }
}
