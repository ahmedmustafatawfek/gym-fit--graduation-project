import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  errors: any ={};
  constructor(public userService:UserService, public router: Router) { }

  ngOnInit() {
  }

  OnSubmit() {

    this.userService.login(this.model).subscribe(
      res => {
        if (res) {
          if (res['Token']) {
            // var expdate = new Date();
            // expdate.setMilliseconds(expdate.getMilliseconds()+res['TokenInfo']['original']['expires_in']);
            localStorage.setItem('token', res['Token']);
            localStorage.setItem('expiration', res['ExpiresIn']);
            localStorage.setItem('userId', res['User']['ID']);
            localStorage.setItem('name', res['User']['FullName']);
            this.router.navigate(['/Products']);
          }
        }
      },
      err => {
        this.errors.login = err.error["Message"];
      }
    );
  }
}
