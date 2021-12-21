import { Component, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Program } from 'app/_Models/Program';
import { FuncsService } from 'app/_services/funcs.service';
import { ProgramService } from 'app/_services/program.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {
  programs:Program[];
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  url:string;

 constructor(public service: ProgramService,public globalFuncs:FuncsService) { }


  ngOnInit() {
    this.service.getPrograms().subscribe(res => {
      this.programs = res['Programs'];
      this.dtTrigger.next();
    });
  }

  DeleteProgram(id:number) {
    this.service.toggleProgram(id.toString()).subscribe(res => {
      this.globalFuncs.showNotification('top','center',res['Message'],'success');
      this.programs.find(s=>s.ID == id).Deleted = !this.programs.find(s=>s.ID == id).Deleted;
    }, err => {
      this.globalFuncs.showNotification('top','center',err.error['Message'],'danger');
      
    });
  }

}
