import { Component, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { User } from 'app/_Models/User';
import { FuncsService } from 'app/_services/funcs.service';
import { UserService } from 'app/_services/user.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(public service:UserService, public globalFuncs:FuncsService) { }

  ngOnInit() {
    this.users=[];
    this.service.getUsers().subscribe(res=>{
      this.users = res['Users'];
      this.dtTrigger.next();
    })
  }

  DeleteUser(id:number){
    this.service.toggleUser(id.toString()).subscribe(res => {
      this.globalFuncs.showNotification('top','center',res['ErrorMessageEn'],'success');
      this.users.find(s=>s.id == id).deleted = !this.users.find(s=>s.id == id).deleted;
    }, err => {
      this.globalFuncs.showNotification('top','center',err.error['ErrorMessageEn'],'danger');
      
    });
  }

  ActivateUser(id:number){
    this.service.activateUser(id.toString()).subscribe(res => {
      this.globalFuncs.showNotification('top','center',res['Message'],'success');
      this.users.find(s=>s.id ==id).user_active = ! this.users.find(s=>s.id ==id).user_active;
    }, err => {
      this.globalFuncs.showNotification('top','center',err.error['Message'],'danger');
    });
  }

}
