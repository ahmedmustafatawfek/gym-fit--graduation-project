import { Component, OnInit } from '@angular/core';
import { Program } from 'app/_Models/Program';
import { FuncsService } from 'app/_services/funcs.service';
import { ProgramService } from 'app/_services/program.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss']
})
export class AddProgramComponent implements OnInit {
  program:Program={};
  constructor(private service:ProgramService, public globalFuncs:FuncsService,
    private _location: Location) {

     }

  ngOnInit() {
  }

  OnSubmit(){
    this.program.CreatedBy = parseInt(localStorage.getItem('ID'));
    this.service.addProgram(this.program).subscribe(res => {
      this.globalFuncs.showNotification('top','center',res['Message'],'success');
      this._location.back();
    }, err => {
      console.log(err);
      this.globalFuncs.parseObject(err.error);
      if(err.error["Message"]) this.globalFuncs.showNotification('top','center',err.error['Message'],'danger');
    });
  }
}
