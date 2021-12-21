import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'app/_services/alertify.service';
import { UserService } from 'app/_services/user.service';
import { User } from '../_Models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: User= {};
  genders= [true,false];
  endDate = new Date();
  date: Date = new Date();
  constructor(public userService:UserService, public alertify:AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  OnSubmit() {
    this.model.RoleID = 3;
    this.userService.register(this.model).subscribe(res => {
      this.alertify.success("Registered Successifully");
      this.router.navigate(['/Login']);
    }, err => {
      console.log(err);
      this.alertify.error(err.error.message);
      
    });
  }
}
