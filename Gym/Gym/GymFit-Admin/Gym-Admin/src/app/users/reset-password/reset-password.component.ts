import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'app/_Models/User';
import { FuncsService } from 'app/_services/funcs.service';
import { UserService } from 'app/_services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  user:User={};
  constructor(private service: UserService, public route:ActivatedRoute,
    private _location:Location , public globalFuncs:FuncsService) { }

  ngOnInit() {
    this.user.id = this.route.snapshot.params['id'];
  }

  OnSubmit(){
    this.service.editUser(this.user).subscribe(res => {
      this.globalFuncs.showNotification('top','center',res['ErrorMessageEn'],'success');
      this._location.back();
    },
    err=> {
      this.globalFuncs.parseObject(err.error);
      if(err.error["ErrorMessageEn"]) this.globalFuncs.showNotification('top','center',err.error['ErrorMessageEn'],'danger');
    });
  }

}
