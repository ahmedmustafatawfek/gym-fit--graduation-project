import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'app/_Models/User';
import { FuncsService } from 'app/_services/funcs.service';
import { UserService } from 'app/_services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  user:User={};
  constructor(private service: UserService, public route:ActivatedRoute,
    private _location:Location , public globalFuncs:FuncsService) { }
  ngOnInit() {
  }

  OnSubmit(){
    this.service.createUser(this.user).subscribe(res => {
      if(res ){
        console.log(res);
        this.globalFuncs.showNotification('top','center','User Created Successifully','success');
        this._location.back();
      }
      else{
        this.globalFuncs.showNotification('top','center','Something went wronge', 'danger');
      }
    }, err => {
      this.globalFuncs.parseObject(err.error);
      console.log(err.error);
      if(err.error["ErrorMessageEn"]) this.globalFuncs.showNotification('top','center',err.error['ErrorMessageEn'],'danger');
    });
  }
}
