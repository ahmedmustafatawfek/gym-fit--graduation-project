import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Gym } from 'app/_Models/Gym';
import { FuncsService } from 'app/_services/funcs.service';
import { GymService } from 'app/_services/gym.service';

@Component({
  selector: 'app-add-gym',
  templateUrl: './add-gym.component.html',
  styleUrls: ['./add-gym.component.scss']
})
export class AddGymComponent implements OnInit {
  gym:Gym={};
  constructor(private service:GymService, private globalFuncs:FuncsService,private _location:Location) { }

  ngOnInit() {
  }

  OnSubmit(){
    this.service.addGym(this.gym).subscribe(res => {
      this.globalFuncs.showNotification('top','center',res['Message'],'success');
      this._location.back();
    }, err => {
      console.log(err);
      this.globalFuncs.parseObject(err.error);
      if(err.error["Message"]) this.globalFuncs.showNotification('top','center',err.error['Message'],'danger');
    });
  }
  onSelectFile(file: any){
    this.gym.Image = <File>file.target.files[0];
  }
}
