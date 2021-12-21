import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Program } from 'app/_Models/Program';
import { FuncsService } from 'app/_services/funcs.service';
import { ProgramService } from 'app/_services/program.service';

@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.scss']
})
export class EditProgramComponent {
  program:Program = {};
  
  constructor(private service:ProgramService, private _location: Location, 
    public route:ActivatedRoute, private globalFuncs:FuncsService) {
    this.program.ID = this.route.snapshot.params['id'];
      console.log(this.program.ID)
        this.service.getProgramById(this.program.ID.toString()).subscribe(res => {
          this.program = res['Program'];
    
        }, 
        err=> {
          this.globalFuncs.parseObject(err.error);
          if(err.error["Message"]) this.globalFuncs.showNotification('top','center',err.error['Message'],'danger');
        });
  }

  OnSubmit(){
    this.service.updateProgram(this.program).subscribe(res => {
      this.globalFuncs.showNotification('top','center',res['Message'],'success');
      this._location.back();
    }, err => {
      this.globalFuncs.showNotification('top','center',err.error['Message'],'danger');
    });
  }

}
