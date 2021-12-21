import { Component, OnInit } from '@angular/core';
import { Program } from 'app/_Models/Program';
import { ProgramService } from 'app/_services/program.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {
  programs:Program[];
  constructor(public service:ProgramService) { }

  ngOnInit() {
    this.service.getPrograms().subscribe(res => {
      this.programs = res['Programs'];
    });
  }

}
